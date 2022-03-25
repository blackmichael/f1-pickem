package client

import (
	"blackmichael/f1-pickem/pkg/domain"
	"context"
	"encoding/json"
	"errors"
	"log"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/lambda"
)

type fetchRaceResultsRequest struct {
	PathParameters fetchRaceResultsPathParams `json:"pathParameters"`
}

type fetchRaceResultsPathParams struct {
	Season     string `json:"season"`
	RaceNumber string `json:"race_number"`
}

type fetchRaceResultsResponse struct {
	StatusCode int    `json:"statusCode`
	Body       string `json:"body"`
}

type FetchRaceResultsClient interface {
	FetchRaceResults(ctx context.Context, season, raceNumber string) (*domain.RaceResults, error)
}

type fetchRaceResultsClient struct {
	client     *lambda.Lambda
	lambdaName string
}

func NewFetchRaceResultsClient(sess *session.Session) FetchRaceResultsClient {
	client := lambda.New(sess)

	return &fetchRaceResultsClient{
		client:     client,
		lambdaName: "f1pickem-FetchRaceResultsLambda-pkhzIZ82V6Fc", // TODO - configure
	}
}

func (c fetchRaceResultsClient) FetchRaceResults(ctx context.Context, season, raceNumber string) (*domain.RaceResults, error) {
	payload, err := json.Marshal(fetchRaceResultsRequest{
		PathParameters: fetchRaceResultsPathParams{
			Season:     season,
			RaceNumber: raceNumber,
		},
	})
	if err != nil {
		log.Printf("ERROR: failed to construct fetch-race-results request (%s)\n", err)
		return nil, err
	}

	request := &lambda.InvokeInput{
		FunctionName: aws.String(c.lambdaName),
		Payload:      payload,
	}

	result, err := c.client.InvokeWithContext(ctx, request)
	if err != nil {
		log.Printf("ERROR: failed to invoke fetch-race-results (%s)\n", err)
		return nil, err
	}

	var resp fetchRaceResultsResponse
	if err = json.Unmarshal(result.Payload, &resp); err != nil {
		log.Printf("ERROR: failed to parse fetch-race-results response (%s)\n", err)
		return nil, err
	}

	// no results available
	if resp.StatusCode == 204 {
		return nil, nil
	}

	if resp.StatusCode != 200 {
		log.Printf("ERROR: received error response from fetch-race-results, response: (%d) %s\n", *result.StatusCode, *result.FunctionError)
		return nil, errors.New("failed to fetch race results")
	}

	var raceResults domain.RaceResults
	if err = json.Unmarshal([]byte(resp.Body), &raceResults); err != nil {
		log.Printf("ERROR: failed to parse fetch-race-results response body (%s)\n", err)
		return nil, err
	}

	return &raceResults, nil
}
