package dynamo

import (
	"blackmichael/f1-pickem/pkg/domain"
	"log"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type RacePicksRepository interface {
	SavePicks(leagueId, raceId, userId string, picks domain.RacePicks) error
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

func (r racePicksRepository) SavePicks(leagueId, raceId, userId string, picks domain.RacePicks) error {
	rawPicks, err := dynamodbattribute.MarshalMap(picks)
	if err != nil {
		log.Printf("ERROR: failed to marshal picks (%s)\n", err.Error())
		return err
	}

	input := &dynamodb.PutItemInput{
		Item:      rawPicks,
		TableName: aws.String(r.tableName),
	}

	_, err = r.svc.PutItem(input)
	if err != nil {
		log.Printf("ERROR: failed to save picks to dynamo (%s)\n", err.Error())
		return err
	}

	return nil
}
