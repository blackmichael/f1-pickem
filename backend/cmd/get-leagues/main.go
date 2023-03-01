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

type Response struct {
	Leagues []LeagueResponse `json:"leagues"`
}

type LeagueResponse struct {
	ID           string `json:"id"`
	Name         string `json:"name"`
	NumOfMembers int    `json:"num_of_members"`
	Season       string `json:"season"`
}

func (h *getLeaguesHandler) Handle(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	userID, ok := request.QueryStringParameters["user_id"]
	if !ok {
		return util.MessageResponse(400, "missing path parameter: user_id"), nil
	}

	leagues, err := h.leaguesRepository.GetLeagues(ctx, userID)
	if err != nil {
		return util.MessageResponse(500, "failed to get leagues"), err
	}

	leagueResponses := make([]LeagueResponse, len(leagues))
	for i, league := range leagues {
		leagueResponses[i] = LeagueResponse{
			ID:           league.ID,
			Name:         league.Name,
			Season:       league.Season,
			NumOfMembers: 0,
		}
	}

	response, err := json.Marshal(&Response{
		Leagues: leagueResponses,
	})
	if err != nil {
		return util.MessageResponse(500, "failed to render response"), nil
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       string(response),
		Headers:    util.CorsHeaders,
	}, nil
}

type getLeaguesHandler struct {
	leaguesRepository dynamo.LeaguesRepository
}

func newGetLeaguesHandler() *getLeaguesHandler {
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

	return &getLeaguesHandler{
		leaguesRepository: dynamo.NewLeaguesRepository(sess),
	}
}

func main() {
	handler := newGetLeaguesHandler()
	lambda.Start(handler.Handle)
}
