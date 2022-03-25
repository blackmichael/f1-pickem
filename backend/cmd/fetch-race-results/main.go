package main

import (
	"blackmichael/f1-pickem/pkg/client"
	"blackmichael/f1-pickem/pkg/dynamo"
	"blackmichael/f1-pickem/pkg/util"
	"context"
	"encoding/json"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/request"
	"github.com/aws/aws-sdk-go/aws/session"
)

func (h fetchRaceResultsHandler) Handle(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	log.Printf("incoming request: %s\n", request.PathParameters)

	season, ok := request.PathParameters["season"]
	if !ok {
		return util.MessageResponse(400, "missing path parameter: season"), nil
	}

	raceNumber, ok := request.PathParameters["race_number"]
	if !ok {
		return util.MessageResponse(400, "missing path parameter: race_number"), nil
	}

	// read race data from db
	raceResults, err := h.raceResultsRepository.GetRaceResults(ctx, season, raceNumber)
	if err != nil {
		return util.MessageResponse(500, "failed to get race data"), err
	}

	if raceResults == nil {
		// if race has no results, fetch them from api
		raceResults, err = h.raceDataClient.GetRaceResults(ctx, season, raceNumber)
		if err != nil {
			return util.MessageResponse(500, "unable to get race results"), err
		}

		if raceResults == nil {
			// send a 204 - we don't have results available
			return events.APIGatewayProxyResponse{
				StatusCode: 204,
				Headers:    util.CorsHeaders,
			}, nil
		}

		// if api has results, write them to db
		err = h.raceResultsRepository.SaveRaceResults(ctx, raceResults)
		if err != nil {
			return util.MessageResponse(500, "failed to save race data"), err
		}
	}

	response, err := json.Marshal(raceResults)
	if err != nil {
		return util.MessageResponse(500, "unable to marshal response"), err
	}

	// respond with whatever results we have
	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       string(response),
		Headers:    util.CorsHeaders,
	}, nil
}

type fetchRaceResultsHandler struct {
	sess                  *session.Session
	raceResultsRepository dynamo.RaceResultsRepository
	raceDataClient        client.RaceDataClient
}

func newFetchRaceResultsHandler() *fetchRaceResultsHandler {
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		Config: aws.Config{
			Region: aws.String("us-east-2"),
		},
		SharedConfigState: session.SharedConfigEnable,
	}))
	sess.Handlers.Send.PushFront(func(r *request.Request) {
		// Log every request made and its payload
		log.Printf("Request: %s/%s, Params: %s\n", r.ClientInfo.ServiceName, r.Operation.Name, r.Params)
	})

	raceResultsRepo := dynamo.NewRaceResultsRepository(sess)
	client := client.NewErgastClient("http://ergast.com") // TODO - config
	return &fetchRaceResultsHandler{sess, raceResultsRepo, client}
}

func main() {
	handler := newFetchRaceResultsHandler()
	lambda.Start(handler.Handle)
}
