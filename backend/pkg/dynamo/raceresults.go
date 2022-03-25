package dynamo

import (
	"blackmichael/f1-pickem/pkg/domain"
	"errors"
	"log"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type RaceResultsRepository interface {
	GetRaceResults(raceId string) (*domain.RaceResults, error)
	SaveRaceResults(race domain.RaceResults) error
}

type raceResultsRepository struct {
	svc       *dynamodb.DynamoDB
	tableName string
}

func NewRaceResultsRepository(sess *session.Session) RaceResultsRepository {
	svc := dynamodb.New(sess)

	return &raceResultsRepository{
		svc:       svc,
		tableName: "RaceResults",
	}
}

func (r raceResultsRepository) GetRaceResults(raceId string) (*domain.RaceResults, error) {
	result, err := r.svc.Query(&dynamodb.QueryInput{
		TableName: aws.String(r.tableName),
		KeyConditions: map[string]*dynamodb.Condition{
			"RaceID": {
				ComparisonOperator: aws.String("EQ"),
				AttributeValueList: []*dynamodb.AttributeValue{
					{
						S: aws.String(raceId),
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

	if *result.Count > int64(1) {
		log.Printf("ERROR: retrieved more than 1 race result")
		return nil, errors.New("unexpected number of items returned")
	}

	var raceResults domain.RaceResults
	if err := dynamodbattribute.UnmarshalMap(result.Items[0], &raceResults); err != nil {
		log.Printf("ERROR: failed to unmarshal dynamo race results (%s)\n", err.Error())
		return nil, err
	}

	return &raceResults, nil
}

func (r raceResultsRepository) SaveRaceResults(raceResults domain.RaceResults) error {
	log.Printf("saving race results to dynamo, raceID: %s\n", raceResults.RaceID)

	rawResults, err := dynamodbattribute.MarshalMap(raceResults)
	if err != nil {
		log.Printf("ERROR: failed to marshal results (%s)\n", err.Error())
		return err
	}

	_, err = r.svc.PutItem(&dynamodb.PutItemInput{
		TableName: aws.String(r.tableName),
		Item:      rawResults,
	})
	if err != nil {
		log.Printf("ERROR: failed to save results to dynamo (%s)\n", err.Error())
		return err
	}

	return nil
}
