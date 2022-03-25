package main

import (
	"blackmichael/f1-pickem/pkg/domain"
	"blackmichael/f1-pickem/pkg/users"
	"blackmichael/f1-pickem/pkg/util"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/request"
	"github.com/aws/aws-sdk-go/aws/session"

	"blackmichael/f1-pickem/pkg/dynamo"
)

type Request struct {
	LeagueId string   `json:"league_id"`
	RaceId   string   `json:"race_id"`
	UserId   string   `json:"user_id"`
	Picks    []string `json:"picks"`
}

type Response struct {
	SubmittedAt string `json:"submitted_at"`
}

func (h submitPicksHandler) Handle(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	log.Printf("incoming request: %s\n", request.Body)

	var req Request
	err := json.Unmarshal([]byte(request.Body), &req)
	if err != nil {
		return util.MessageResponse(400, "bad request"), nil
	}

	// hack: user auth/service isn't a thing yet, so have the frontend pass an email for the userid
	// and then verify that it's a known user account / map it to an id
	userId, err := users.GetUserId(strings.ToLower(req.UserId))
	if err != nil {
		return util.MessageResponse(404, "user not found"), nil
	}
	req.UserId = userId

	if len(req.Picks) != 10 {
		return util.MessageResponse(422, "must provide exactly 10 picks"), nil
	}

	picks := domain.RacePicks{
		LeagueIdRaceId: fmt.Sprintf("%s-%s", req.LeagueId, req.RaceId),
		UserId:         req.UserId,
		Picks:          req.Picks,
		SubmittedAt:    time.Now().UTC(),
	}

	err = h.racePicksRepository.SavePicks(ctx, req.LeagueId, req.RaceId, req.UserId, picks)
	if err != nil {
		return util.MessageResponse(500, "failed to save picks to db"), err
	}

	response, err := json.Marshal(Response{
		SubmittedAt: picks.SubmittedAt.UTC().Format(time.RFC3339),
	})
	if err != nil {
		return util.MessageResponse(500, "failed to render response"), err
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 201,
		Body:       string(response),
		Headers:    util.CorsHeaders,
	}, nil
}

type submitPicksHandler struct {
	sess                *session.Session
	racePicksRepository dynamo.RacePicksRepository
}

func newSubmitPicksHandler() *submitPicksHandler {
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		Config: aws.Config{
			Region: aws.String("us-east-2"),
		},
		SharedConfigState: session.SharedConfigEnable,
	}))
	sess.Handlers.Send.PushFront(func(r *request.Request) {
		// Log every request made and its payload
		log.Printf("Request: %s/%s, Params: %s",
			r.ClientInfo.ServiceName, r.Operation.Name, r.Params)
	})

	racePicksRepo := dynamo.NewRacePicksRepository(sess)
	return &submitPicksHandler{sess, racePicksRepo}
}

func main() {
	handler := newSubmitPicksHandler()
	lambda.Start(handler.Handle)
}
