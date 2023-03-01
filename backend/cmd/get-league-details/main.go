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
	LeagueID          string            `json:"id"`
	LeagueName        string            `json:"name"`
	LeagueSeason      string            `json:"season"`
	LeagueInviteToken string            `json:"invite_token,omitempty"`
	LeagueMembers     []MembersResponse `json:"members"`
}

type MembersResponse struct {
	UserID     string `json:"id"`
	UserName   string `json:"name"`
	UserStatus string `json:"status"`
}

func (h *getLeagueDetailsHandler) Handle(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	leagueID, ok := request.PathParameters["league_id"]
	if !ok {
		return util.MessageResponse(400, "missing path parameter: league_id"), nil
	}

	userID, ok := request.QueryStringParameters["user_id"]
	if !ok {
		return util.MessageResponse(400, "missing path parameter: user_id"), nil
	}

	league, err := h.leaguesRepository.GetLeagueDetails(ctx, leagueID)
	if err != nil {
		return util.MessageResponse(500, "failed to get league details"), err
	}

	resp := &Response{
		LeagueID:      leagueID,
		LeagueName:    league.Name,
		LeagueSeason:  league.Season,
		LeagueMembers: make([]MembersResponse, len(league.Users)),
	}
	foundUser := false
	log.Printf("INFO: league details %#v\n", *league)
	log.Printf("INFO: looking for user %s\n", userID)
	for i, user := range league.Users {
		log.Printf("INFO: found user %s\n", user.ID)
		if user.ID == userID {
			foundUser = true

			// if the requester is the owner then supply the invite token
			if user.Status == domain.OwnerStatus {
				resp.LeagueInviteToken = league.InviteToken
			}
		}

		resp.LeagueMembers[i] = MembersResponse{
			UserID:     userID,
			UserName:   user.Name,
			UserStatus: string(user.Status),
		}
	}

	// if user isn't in league then reject request
	if !foundUser {
		return util.MessageResponse(403, "unauthorized to fetch league details"), nil
	}

	response, err := json.Marshal(resp)
	if err != nil {
		return util.MessageResponse(500, "failed to render response"), err
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       string(response),
		Headers:    util.CorsHeaders,
	}, nil
}

type getLeagueDetailsHandler struct {
	leaguesRepository dynamo.LeaguesRepository
}

func newGetLeagueDetailsHandler() *getLeagueDetailsHandler {
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

	return &getLeagueDetailsHandler{
		leaguesRepository: dynamo.NewLeaguesRepository(sess),
	}
}

func main() {
	handler := newGetLeagueDetailsHandler()
	lambda.Start(handler.Handle)
}
