package dynamo

import (
	"blackmichael/f1-pickem/pkg/domain"
	"context"
	"errors"
	"log"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type RacesRepository interface {
	GetRaces(ctx context.Context, season string) (domain.Races, error)
	SaveRaces(ctx context.Context, races domain.Races) error
}

type racesRepository struct {
	svc       *dynamodb.DynamoDB
	tableName string
}

func NewRacesRepository(sess *session.Session) RacesRepository {
	svc := dynamodb.New(sess)

	return &raceResultsRepository{
		svc: svc,
	}
}

func (r raceResultsRepository) GetRaces(ctx context.Context, season string) (domain.Races, error) {
	result, err := r.svc.QueryWithContext(ctx, &dynamodb.QueryInput{
		TableName: racesTableName,
		KeyConditions: map[string]*dynamodb.Condition{
			"Season": {
				ComparisonOperator: aws.String("EQ"),
				AttributeValueList: []*dynamodb.AttributeValue{
					{
						S: aws.String(season),
					},
				},
			},
		},
	})
	if err != nil {
		log.Printf("ERROR: failed to retrieve race results (%s)\n", err.Error())
		return nil, err
	}

	if *result.Count == int64(0) {
		return nil, nil
	}

	races := make(domain.Races, *result.Count, *result.Count)
	for i, race := range result.Items {
		if err := dynamodbattribute.UnmarshalMap(race, &races[i]); err != nil {
			log.Printf("ERROR: failed to unmarshal dynamo races (%s)\n", err.Error())
			return nil, err
		}
	}

	return races, nil
}

func (r raceResultsRepository) SaveRaces(ctx context.Context, races domain.Races) error {
	if races == nil {
		return errors.New("unexpected nil input")
	}

	log.Printf("saving %d races to dynamo, season: %s\n", len(races), races[0].Season)
	requests := make([]*dynamodb.WriteRequest, len(races), len(races))
	for i, race := range races {
		marshalledRace, err := dynamodbattribute.MarshalMap(race)
		if err != nil {
			log.Printf("ERROR: failed to marshal race (%s)\n", err.Error())
			return err
		}
		requests[i] = &dynamodb.WriteRequest{
			PutRequest: &dynamodb.PutRequest{
				Item: marshalledRace,
			},
		}
	}

	output, err := r.svc.BatchWriteItemWithContext(ctx, &dynamodb.BatchWriteItemInput{
		RequestItems: map[string][]*dynamodb.WriteRequest{
			*racesTableName: requests,
		},
	})
	for _, unprocessedItem := range output.UnprocessedItems[*racesTableName] {
		log.Printf("INFO: unprocessed item: %v\n", unprocessedItem.GoString())
	}
	if err != nil {
		log.Printf("ERROR: failed to save races to dynamo (%s)\n", err.Error())
		return err
	}

	return nil
}
