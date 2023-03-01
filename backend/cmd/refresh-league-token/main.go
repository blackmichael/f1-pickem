package main

import (
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
	LeagueInviteToken string `json:"league_invite_token,omitempty"`
}

func (h *refreshLeagueTokenHandler) Handle(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	leagueID, ok := request.PathParameters["league_id"]
	if !ok {
		return util.MessageResponse(400, "missing path parameter: league_id"), nil
	}

	userID, ok := request.QueryStringParameters["user_id"]
	if !ok {
		return util.MessageResponse(400, "missing path parameter: user_id"), nil
	}

	// authenticate requesting user
	user, err := h.leaguesRepository.GetLeagueUser(ctx, leagueID, userID)
	if err != nil {
		return util.MessageResponse(500, "failed to get league user"), err
	}

	if user == nil || user.Status != domain.OwnerStatus {
		return util.MessageResponse(403, "unauthorized to refresh token"), nil
	}

	token, err := domain.NewToken()
	if err != nil {
		return util.MessageResponse(500, "failed to create new token"), err
	}

	err = h.leaguesRepository.ReplaceLeagueToken(ctx, leagueID, token)
	if err != nil {
		return util.MessageResponse(500, "failed to get league details"), err
	}

	response, err := json.Marshal(&Response{
		LeagueInviteToken: token,
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

type refreshLeagueTokenHandler struct {
	leaguesRepository dynamo.LeaguesRepository
}

func newRefreshLeagueTokenHandler() *refreshLeagueTokenHandler {
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

	return &refreshLeagueTokenHandler{
		leaguesRepository: dynamo.NewLeaguesRepository(sess),
	}
}

func main() {
	handler := newRefreshLeagueTokenHandler()
	lambda.Start(handler.Handle)
}
