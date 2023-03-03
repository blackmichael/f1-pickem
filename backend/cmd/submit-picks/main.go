package main

import (
	"blackmichael/f1-pickem/pkg/domain"
	"blackmichael/f1-pickem/pkg/util"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/request"
	"github.com/aws/aws-sdk-go/aws/session"

	"blackmichael/f1-pickem/pkg/dynamo"
)

type Request struct {
	LeagueID string   `json:"league_id"`
	RaceID   string   `json:"race_id"`
	UserID   string   `json:"user_id"`
	Picks    []string `json:"picks"`

	// It's probably cleaner to not require the frontend to pass in the user's name
	// every time they join a league but to do that with the adjacency lists pattern
	// would require some sort of DDB Streams background job to update user items.
	// This is much simpler for now. Cognito is annoying.
	UserName string `json:"user_name"`
}

type Response struct {
	SubmittedAt string `json:"submitted_at"`
}

func (h submitPicksHandler) Handle(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var req Request
	err := json.Unmarshal([]byte(request.Body), &req)
	if err != nil {
		return util.MessageResponse(400, "bad request"), nil
	}

	if len(req.Picks) != 10 {
		return util.MessageResponse(422, "must provide exactly 10 picks"), nil
	}

	picks := domain.RacePicks{
		LeagueIdRaceId: fmt.Sprintf("%s-%s", req.LeagueID, req.RaceID),
		UserID:         req.UserID,
		UserName:       req.UserName,
		Picks:          req.Picks,
		SubmittedAt:    time.Now().UTC(),
	}

	err = h.racePicksRepository.SavePicks(ctx, picks)
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
