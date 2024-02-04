package dynamo

import (
	"blackmichael/f1-pickem/pkg/domain"
	"context"
	"fmt"
	"log"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type RacePicksRepository interface {
	GetRacePicks(ctx context.Context, leagueId, raceId string) ([]*domain.RacePicks, error)
	GetLeaguePicks(ctx context.Context, leagueId string) ([]*domain.RacePicks, error)
	SavePicks(ctx context.Context, picks domain.RacePicks) error
}

type racePicksRepository struct {
	svc *dynamodb.DynamoDB
}

func NewRacePicksRepository(sess *session.Session) RacePicksRepository {
	svc := dynamodb.New(sess)

	return &racePicksRepository{
		svc: svc,
	}
}

func (r racePicksRepository) GetLeaguePicks(ctx context.Context, leagueId string) ([]*domain.RacePicks, error) {
	result, err := r.svc.ExecuteStatementWithContext(ctx, &dynamodb.ExecuteStatementInput{
		Statement: aws.String(fmt.Sprintf(`SELECT * FROM "RacePicks" WHERE begins_with("LeagueID-RaceID", '%s')`, leagueId)),
	})

	if err != nil {
		log.Printf("ERROR failed to query league picks (%s)\n", err)
		return nil, err
	}

	var allPicks []*domain.RacePicks
	if err = dynamodbattribute.UnmarshalListOfMaps(result.Items, &allPicks); err != nil {
		log.Printf("ERROR failed to unmarshal picks (%s)\n", err)
		return nil, err
	}

	return allPicks, nil
}

func (r racePicksRepository) GetRacePicks(ctx context.Context, leagueId, raceId string) ([]*domain.RacePicks, error) {
	result, err := r.svc.QueryWithContext(ctx, &dynamodb.QueryInput{
		TableName: racePicksTableName,
		KeyConditions: map[string]*dynamodb.Condition{
			"LeagueID-RaceID": {
				ComparisonOperator: aws.String("EQ"),
				AttributeValueList: []*dynamodb.AttributeValue{
					{
						S: aws.String(fmt.Sprintf("%s-%s", leagueId, raceId)),
					},
				},
			},
		},
	})
	if err != nil {
		log.Printf("ERROR failed to query picks (%s)\n", err)
		return nil, err
	}

	var allPicks []*domain.RacePicks
	if err = dynamodbattribute.UnmarshalListOfMaps(result.Items, &allPicks); err != nil {
		log.Printf("ERROR failed to unmarshal picks (%s)\n", err)
		return nil, err
	}

	return allPicks, nil
}

func (r racePicksRepository) SavePicks(ctx context.Context, picks domain.RacePicks) error {
	rawPicks, err := dynamodbattribute.MarshalMap(picks)
	if err != nil {
		log.Printf("ERROR: failed to marshal picks (%s)\n", err.Error())
		return err
	}

	input := &dynamodb.PutItemInput{
		Item:      rawPicks,
		TableName: racePicksTableName,
	}

	_, err = r.svc.PutItemWithContext(ctx, input)
	if err != nil {
		log.Printf("ERROR: failed to save picks to dynamo (%s)\n", err.Error())
		return err
	}

	return nil
}
