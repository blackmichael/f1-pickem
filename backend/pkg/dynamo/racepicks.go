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
	GetAllPicks(ctx context.Context, leagueId, raceId string) ([]*domain.RacePicks, error)
	SavePicks(ctx context.Context, leagueId, raceId, userId string, picks domain.RacePicks) error
}

type racePicksRepository struct {
	svc       *dynamodb.DynamoDB
	tableName string
}

func NewRacePicksRepository(sess *session.Session) RacePicksRepository {
	svc := dynamodb.New(sess)

	return &racePicksRepository{
		svc:       svc,
		tableName: "RacePicks",
	}
}

func (r racePicksRepository) GetAllPicks(ctx context.Context, leagueId, raceId string) ([]*domain.RacePicks, error) {
	result, err := r.svc.QueryWithContext(ctx, &dynamodb.QueryInput{
		TableName: aws.String(r.tableName),
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
		log.Printf("")
		return nil, err
	}

	allPicks := make([]*domain.RacePicks, len(result.Items), len(result.Items))
	for i, item := range result.Items {
		var picks domain.RacePicks
		if err := dynamodbattribute.UnmarshalMap(item, &picks); err != nil {
			log.Printf("")
			return nil, err
		}

		allPicks[i] = &picks
	}

	return allPicks, nil
}

func (r racePicksRepository) SavePicks(ctx context.Context, leagueId, raceId, userId string, picks domain.RacePicks) error {
	rawPicks, err := dynamodbattribute.MarshalMap(picks)
	if err != nil {
		log.Printf("ERROR: failed to marshal picks (%s)\n", err.Error())
		return err
	}

	input := &dynamodb.PutItemInput{
		Item:      rawPicks,
		TableName: aws.String(r.tableName),
	}

	_, err = r.svc.PutItemWithContext(ctx, input)
	if err != nil {
		log.Printf("ERROR: failed to save picks to dynamo (%s)\n", err.Error())
		return err
	}

	return nil
}
