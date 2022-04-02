package main

import (
	"blackmichael/f1-pickem/pkg/client"
	"blackmichael/f1-pickem/pkg/domain"
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

type Response struct {
	UserScores []*domain.RaceScore `json:"user_scores"`
}

func (h getRaceScoresHandler) Handle(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	log.Printf("incoming request: %s\n", request.PathParameters)

	leagueId, ok := request.PathParameters["league"]
	if !ok {
		return util.MessageResponse(400, "missing path parameter: league"), nil
	}

	raceId, ok := request.PathParameters["race_id"]
	if !ok {
		return util.MessageResponse(400, "missing path parameter: race_id"), nil
	}

	season := raceId[0:4]
	raceNumber := raceId[4:]

	raceResults, err := h.raceResultsClient.FetchRaceResults(ctx, season, raceNumber)
	if err != nil {
		return util.MessageResponse(500, "failed to fetch race results"), err
	}

	// results are not ready yet
	if raceResults == nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 204,
			Headers:    util.CorsHeaders,
		}, nil
	}

	allPicks, err := h.racePicksRepository.GetAllPicks(ctx, leagueId, raceId)
	if err != nil {
		return util.MessageResponse(500, "failed to get user picks"), err
	}

	scorer := domain.NewRaceScorer(raceResults)
	userScores := make([]*domain.RaceScore, 0)
	for _, userPicks := range allPicks {
		userScores = append(userScores, scorer.GetScore(userPicks))
	}

	response, err := json.Marshal(Response{UserScores: userScores})
	if err != nil {
		return util.MessageResponse(500, "unable to marshal response"), err
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       string(response),
		Headers:    util.CorsHeaders,
	}, nil
}

type getRaceScoresHandler struct {
	sess                *session.Session
	racePicksRepository dynamo.RacePicksRepository
	raceResultsClient   client.FetchRaceResultsClient
}

func newGetRaceScoresHandler() *getRaceScoresHandler {
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

	racePicksRepo := dynamo.NewRacePicksRepository(sess)
	raceResultsClient := client.NewFetchRaceResultsClient(sess)

	return &getRaceScoresHandler{sess, racePicksRepo, raceResultsClient}
}

func main() {
	handler := newGetRaceScoresHandler()
	lambda.Start(handler.Handle)
}
