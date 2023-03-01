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
	"github.com/rs/xid"
)

type Request struct {
	LeagueName    string `json:"league_name"`
	Season        string `json:"season"`
	OwnerUserID   string `json:"owner_user_id"`
	OwnerUserName string `json:"owner_user_name"`
}

// todo - maybe this should return the same response as get-leagues for frontend ease
type Response struct {
	LeagueID    string `json:"league_id"`
	InviteToken string `json:"invite_token"`
}

func (h *createLeagueHandler) Handle(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var req Request
	if err := json.Unmarshal([]byte(request.Body), &req); err != nil {
		return util.MessageResponse(400, "bad request"), nil
	}

	if req.LeagueName == "" {
		return util.MessageResponse(400, "missing league name"), nil
	}

	if req.Season == "" {
		return util.MessageResponse(400, "missing season"), nil
	}

	if req.OwnerUserID == "" {
		return util.MessageResponse(400, "missing owner user id"), nil
	}

	if req.OwnerUserName == "" {
		return util.MessageResponse(400, "missing owner user name"), nil
	}

	token, err := domain.NewToken()
	if err != nil {
		return util.MessageResponse(500, "failed to create token"), err
	}

	league := &domain.UserLeague{
		LeagueID:          xid.New().String(),
		UserID:            req.OwnerUserID,
		LeagueName:        req.LeagueName,
		LeagueSeason:      req.Season,
		Status:            domain.OwnerStatus,
		UserName:          req.OwnerUserName,
		LeagueInviteToken: token,
	}

	if err := h.leaguesRepository.CreateLeague(ctx, league); err != nil {
		return util.MessageResponse(500, "failed to create new league"), err
	}

	response, err := json.Marshal(Response{
		LeagueID: league.LeagueID,
		InviteToken: token,
	})
	if err != nil {
		return util.MessageResponse(500, "failed to render response"), err
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 201,
		Headers:    util.CorsHeaders,
		Body:       string(response),
	}, nil
}

type createLeagueHandler struct {
	sess              *session.Session
	leaguesRepository dynamo.LeaguesRepository
}

func newCreateLeagueHandler() *createLeagueHandler {
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		Config:            aws.Config{Region: aws.String("us-east-2")},
		SharedConfigState: session.SharedConfigEnable,
	}))
	sess.Handlers.Send.PushFront(func(r *request.Request) {
		log.Printf("Request: %s/%s, Parmas: %s", r.ClientInfo.ServiceName, r.Operation.Name, r.Params)
	})

	return &createLeagueHandler{
		sess:              sess,
		leaguesRepository: dynamo.NewLeaguesRepository(sess),
	}
}

func main() {
	handler := newCreateLeagueHandler()
	lambda.Start(handler.Handle)
}
