package main

import (
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

type Request struct {
	LeagueID    string `json:"league_id"`
	UserID      string `json:"user_id"`
	InviteToken string `json:"invite_token"`

	// It's probably cleaner to not require the frontend to pass in the user's name
	// every time they join a league but to do that with the adjacency lists pattern
	// would require some sort of DDB Streams background job to update user items.
	// This is much simpler for now
	UserName string `json:"user_name"`
}

func (h *joinLeagueHandler) Handle(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var req Request
	if err := json.Unmarshal([]byte(request.Body), &req); err != nil {
		return util.MessageResponse(400, "bad request"), nil
	}

	// we can shortcircuit/protect this by validating the request first

	leagueToken, err := h.leaguesRepository.GetLeagueToken(ctx, req.LeagueID, req.UserID)
	if err != nil {
		return util.MessageResponse(500, "failed to check league token"), err
	}

	// if the token doesn't exist (expired) or doesn't match the request, reject it
	if leagueToken.LeagueInviteToken == "" ||
		leagueToken.LeagueInviteToken != req.InviteToken {
		return util.MessageResponse(403, "invalid invite token"), nil
	}

	// what if user is already in league?

	err = h.leaguesRepository.AddLeagueUser(ctx, req.LeagueID, req.UserID, req.UserName)
	if err != nil {
		return util.MessageResponse(500, "failed to add new member to league"), nil
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 204,
		Headers:    util.CorsHeaders,
	}, nil
}

type joinLeagueHandler struct {
	leaguesRepository dynamo.LeaguesRepository
}

func newJoinLeagueHandler() *joinLeagueHandler {
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

	return &joinLeagueHandler{
		leaguesRepository: dynamo.NewLeaguesRepository(sess),
	}
}

func main() {
	handler := newJoinLeagueHandler()
	lambda.Start(handler.Handle)
}
