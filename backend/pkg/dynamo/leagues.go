package dynamo

import (
	"blackmichael/f1-pickem/pkg/domain"
	"context"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type LeaguesRepository interface {
	CreateLeague(ctx context.Context, userLeague *domain.UserLeague) error
	GetLeagues(ctx context.Context, userID string) ([]domain.League, error)
	GetLeagueDetails(ctx context.Context, leagueID string) (*domain.League, error)
	GetLeagueToken(ctx context.Context, leagueID, requestingUserID string) (*domain.LeagueToken, error)
	AddLeagueUser(ctx context.Context, leagueID, userID, userName string) error
	ReplaceLeagueToken(ctx context.Context, leagueID, token string) error
	GetLeagueUser(ctx context.Context, leagueID, userID string) (*domain.User, error)
}

type leaguesRepository struct {
	svc       *dynamodb.DynamoDB
	tableName string
}

func NewLeaguesRepository(sess *session.Session) LeaguesRepository {
	svc := dynamodb.New(sess)

	return &leaguesRepository{
		svc: svc,
	}
}

func (r *leaguesRepository) CreateLeague(ctx context.Context, userLeague *domain.UserLeague) error {
	leagueItem, err := dynamodbattribute.MarshalMap(&UserLeagueTableItem{
		PartitionKey: getLeagueID(userLeague.LeagueID),
		SortKey:      getLeagueID(userLeague.LeagueID),

		LeagueName:   userLeague.LeagueName,
		LeagueSeason: userLeague.LeagueSeason,
	})
	if err != nil {
		log.Printf("ERROR: failed to marshal league (%s)\n", err)
		return err
	}

	userLeagueItem, err := dynamodbattribute.MarshalMap(&UserLeagueTableItem{
		PartitionKey:     getUserID(userLeague.UserID),
		SortKey:          getLeagueID(userLeague.LeagueID),
		UserLeagueStatus: string(userLeague.Status),
		UserName:         userLeague.UserName,
	})
	if err != nil {
		log.Printf("ERROR: failed to marshal user league (%s)\n", err)
		return err
	}

	expirationTime := time.Now().Add(48 * time.Hour)
	leagueTokenItem, err := dynamodbattribute.MarshalMap(&UserLeagueTableItem{
		PartitionKey:                tokenKey,
		SortKey:                     getLeagueID(userLeague.LeagueID),
		LeagueInviteToken:           userLeague.LeagueInviteToken,
		LeagueInviteTokenExpiration: &expirationTime,
	})
	if err != nil {
		log.Printf("ERROR: failed to marshal league token (%s)\n", err)
		return err
	}

	_, err = r.svc.BatchWriteItemWithContext(ctx, &dynamodb.BatchWriteItemInput{
		RequestItems: map[string][]*dynamodb.WriteRequest{
			*usersLeaguesTableName: {
				{
					PutRequest: &dynamodb.PutRequest{
						Item: leagueItem,
					},
				},
				{
					PutRequest: &dynamodb.PutRequest{
						Item: userLeagueItem,
					},
				},
				{
					PutRequest: &dynamodb.PutRequest{
						Item: leagueTokenItem,
					},
				},
			},
		},
	})
	if err != nil {
		log.Printf("ERROR: failed to save league to dynamo (%s)\n", err)
		return err
	}

	return nil
}

func (r *leaguesRepository) ReplaceLeagueToken(ctx context.Context, leagueID, token string) error {
	expirationTime := time.Now().Add(48 * time.Hour)
	item, err := dynamodbattribute.MarshalMap(&UserLeagueTableItem{
		PartitionKey:                tokenKey,
		SortKey:                     getLeagueID(leagueID),
		LeagueInviteToken:           token,
		LeagueInviteTokenExpiration: &expirationTime,
	})
	if err != nil {
		log.Printf("ERROR: failed to marshal league token (%s)\n", err)
		return err
	}

	_, err = r.svc.PutItemWithContext(ctx, &dynamodb.PutItemInput{
		TableName: usersLeaguesTableName,
		Item:      item,
	})
	if err != nil {
		log.Printf("ERROR: failed to write league token (%s)\n", err)
		return err
	}

	return err
}

func (r *leaguesRepository) AddLeagueUser(ctx context.Context, leagueID, userID, userName string) error {
	item, err := dynamodbattribute.MarshalMap(&UserLeagueTableItem{
		PartitionKey:     getUserID(userID),
		SortKey:          getLeagueID(leagueID),
		UserName:         userName,
		UserLeagueStatus: string(domain.MemberStatus),
	})
	if err != nil {
		log.Printf("ERROR: failed to marshal new league user (%s)\n", err)
		return err
	}

	_, err = r.svc.PutItemWithContext(ctx, &dynamodb.PutItemInput{
		TableName: usersLeaguesTableName,
		Item:      item,
	})
	if err != nil {
		log.Printf("ERROR: failed to add new league member (%s)\n", err)
		return err
	}

	return nil
}

func (r *leaguesRepository) GetLeagueUser(ctx context.Context, leagueID, userID string) (*domain.User, error) {
	output, err := r.svc.GetItemWithContext(ctx, &dynamodb.GetItemInput{
		TableName: usersLeaguesTableName,
		Key: map[string]*dynamodb.AttributeValue{
			"PartitionKey": {
				S: aws.String(getUserID(userID)),
			},
			"SortKey": {
				S: aws.String(getLeagueID(leagueID)),
			},
		},
	})
	if err != nil {
		log.Printf("ERROR: failed to get league member (%s)\n", err)
		return nil, err
	}

	if len(output.Item) == 0 {
		return nil, nil
	}

	var item UserLeagueTableItem
	if err = dynamodbattribute.UnmarshalMap(output.Item, &item); err != nil {
		log.Printf("ERROR: failed to unmarshal league user (%s)\n", err)
		return nil, err
	}

	user := &domain.User{
		ID:     userID,
		Name:   item.UserName,
		Status: domain.UserStatus(item.UserLeagueStatus),
	}

	return user, nil
}

func (r *leaguesRepository) GetLeagues(ctx context.Context, userID string) ([]domain.League, error) {
	output, err := r.svc.QueryWithContext(ctx, &dynamodb.QueryInput{
		TableName:              usersLeaguesTableName,
		KeyConditionExpression: aws.String("PartitionKey = :userID"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":userID": {
				S: aws.String(getUserID(userID)),
			},
			":member": {
				S: aws.String(string(domain.MemberStatus)),
			},
			":owner": {
				S: aws.String(string(domain.OwnerStatus)),
			},
		},
		FilterExpression: aws.String("UserLeagueStatus = :member or UserLeagueStatus = :owner"),
	})
	if err != nil {
		log.Printf("ERROR: failed to query for user leagues (%s)\n", err)
		return nil, err
	}

	var userLeagues []UserLeagueTableItem
	if err := dynamodbattribute.UnmarshalListOfMaps(output.Items, &userLeagues); err != nil {
		log.Printf("ERROR: failed to unmarshal user leagues result (%s)\n", err)
		return nil, err
	}

	if len(userLeagues) == 0 {
		return []domain.League{}, nil
	}

	leagueKeys := make([]map[string]*dynamodb.AttributeValue, len(userLeagues))
	for i, league := range userLeagues {
		leagueKeys[i] = map[string]*dynamodb.AttributeValue{
			"PartitionKey": {
				S: aws.String(league.SortKey),
			},
			"SortKey": {
				S: aws.String(league.SortKey),
			},
		}
	}

	leaguesOutput, err := r.svc.BatchGetItemWithContext(ctx, &dynamodb.BatchGetItemInput{
		RequestItems: map[string]*dynamodb.KeysAndAttributes{
			*usersLeaguesTableName: {
				Keys: leagueKeys,
			},
		},
	})
	if err != nil {
		log.Printf("ERROR: failed to batch retrieve league details (%s)\n", err)
		return nil, err
	}

	tableResponse := leaguesOutput.Responses[*usersLeaguesTableName]
	var leagueItems []UserLeagueTableItem
	if err := dynamodbattribute.UnmarshalListOfMaps(tableResponse, &leagueItems); err != nil {
		log.Printf("ERROR: failed to unmarshal league details response (%s)\n", err)
		return nil, err
	}

	leagues := make([]domain.League, len(leagueItems))
	for i, leagueItem := range leagueItems {
		leagues[i] = domain.League{
			ID:     parseLeagueID(leagueItem.SortKey),
			Name:   leagueItem.LeagueName,
			Season: leagueItem.LeagueSeason,
		}
	}

	return leagues, nil
}

func (r *leaguesRepository) GetLeagueDetails(ctx context.Context, leagueID string) (*domain.League, error) {
	output, err := r.svc.QueryWithContext(ctx, &dynamodb.QueryInput{
		TableName: usersLeaguesTableName,
		IndexName: leagueUserIndexName,
		// For the League-User-Index GSI, SortKey is the partition key
		KeyConditionExpression: aws.String("SortKey = :leagueID"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":leagueID": {
				S: aws.String(getLeagueID(leagueID)),
			},
		},
	})
	if err != nil {
		log.Printf("ERROR: failed to query league details (%s)\n", err)
		return nil, err
	}

	var items []UserLeagueTableItem
	if err := dynamodbattribute.UnmarshalListOfMaps(output.Items, &items); err != nil {
		log.Printf("ERROR: failed to unmarshal league details (%s)\n", err)
		return nil, err
	}

	league := &domain.League{
		Users: []domain.User{},
	}
	for _, item := range items {
		// check the GSI sort key to process each league item, user item, and token item
		if item.PartitionKey == getLeagueID(leagueID) {
			league.ID = parseLeagueID(item.PartitionKey)
			league.Name = item.LeagueName
			league.Season = item.LeagueSeason
		} else if strings.HasPrefix(item.PartitionKey, "user-") {
			league.Users = append(league.Users, domain.User{
				ID:     parseUserID(item.PartitionKey),
				Name:   item.UserName,
				Status: domain.UserStatus(item.UserLeagueStatus),
			})
		} else if item.PartitionKey == tokenKey {
			league.InviteToken = item.LeagueInviteToken
		} else {
			log.Printf("WARN: unrecognized item, PartitionKey=%s SortKey=%s", item.PartitionKey, item.SortKey)
		}
	}

	return league, nil
}

func (r *leaguesRepository) GetLeagueToken(ctx context.Context, leagueID, requestingUserID string) (*domain.LeagueToken, error) {
	// retrieve the league's token and the requester's league status
	output, err := r.svc.BatchGetItemWithContext(ctx, &dynamodb.BatchGetItemInput{
		RequestItems: map[string]*dynamodb.KeysAndAttributes{
			*usersLeaguesTableName: {
				Keys: []map[string]*dynamodb.AttributeValue{
					{
						"PartitionKey": &dynamodb.AttributeValue{
							S: aws.String(getLeagueID(leagueID)),
						},
						"SortKey": &dynamodb.AttributeValue{
							S: aws.String(tokenKey),
						},
					},
					{
						"PartitionKey": &dynamodb.AttributeValue{
							S: aws.String(getUserID(requestingUserID)),
						},
						"SortKey": &dynamodb.AttributeValue{
							S: aws.String(getLeagueID(leagueID)),
						},
					},
				},
			},
		},
	})
	if err != nil {
		log.Printf("ERROR: failed to get league token (%s)\n", err)
		return nil, err
	}

	tableResponse := output.Responses[*usersLeaguesTableName]
	var items []UserLeagueTableItem
	if err := dynamodbattribute.UnmarshalListOfMaps(tableResponse, &items); err != nil {
		log.Printf("ERROR: failed to unmarshal get league token response (%s)\n", err)
		return nil, err
	}

	leagueToken := &domain.LeagueToken{
		LeagueID:        leagueID,
		RequesterStatus: domain.NoStatus,
	}
	for _, item := range items {
		if item.PartitionKey == getLeagueID(leagueID) &&
			item.SortKey == tokenKey {
			leagueToken.LeagueInviteToken = item.LeagueInviteToken
		} else if item.PartitionKey == getUserID(requestingUserID) &&
			item.SortKey == getLeagueID(leagueID) {
			leagueToken.RequesterStatus = domain.UserStatus(item.UserLeagueStatus)
		} else {
			log.Printf("WARN: unrecognized table item, PartitionKey=%s SortKey=%s", item.PartitionKey, item.SortKey)
		}
	}

	return leagueToken, nil
}

// These types represent the varying relationships represented in the Users-Leagues table

type UserLeagueTableItem struct {
	PartitionKey string `dynamodbav:"PartitionKey,omitempty"`
	SortKey      string `dynamodbav:"SortKey,omitempty"`

	// League attributes
	LeagueName                  string     `dynamodbav:",omitempty"`
	LeagueSeason                string     `dynamodbav:",omitempty"`
	LeagueInviteToken           string     `dynamodbav:",omitempty"`
	LeagueInviteTokenExpiration *time.Time `dynamodbav:",omitempty"`

	// User-League attributes
	UserLeagueStatus string `dynamodbav:",omitempty"`

	// User attributes (name is denormalized)
	UserName  string `dynamodbav:",omitempty"`
	UserScore int    `dynamodbav:",omitempty"`
}

func getUserID(id string) string {
	return fmt.Sprintf("user-%s", id)
}

func parseUserID(id string) string {
	return strings.Replace(id, "user-", "", -1)
}

func getLeagueID(id string) string {
	return fmt.Sprintf("league-%s", id)
}

func parseLeagueID(tableID string) string {
	return strings.Replace(tableID, "league-", "", -1)
}

const tokenKey = "token"

/*
Access patterns:
- Get leagues by user (look up by user id)
	- Look up by user id
	- Need names, seasons
	- Filter by member or owner
- Get league data by league
	- Look up by league id
	- Need name, season, members, scores
- Update user score in league
- Update users in league
*/
