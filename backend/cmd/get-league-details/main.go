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
	LeagueID          string             `json:"id"`
	LeagueName        string             `json:"name"`
	LeagueSeason      string             `json:"season"`
	LeagueInviteToken string             `json:"invite_token,omitempty"`
	LeagueMembers     []*MembersResponse `json:"members"`
}

type MembersResponse struct {
	UserID       string  `json:"id"`
	UserName     string  `json:"name"`
	UserStatus   string  `json:"status"`
	TotalScore   int     `json:"total_score"`
	AverageScore float32 `json:"average_score"`
	BestScore    int     `json:"best_score"`
	WorstScore   int     `json:"worst_score"`
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
		LeagueMembers: make([]*MembersResponse, len(league.Users)),
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

		resp.LeagueMembers[i] = &MembersResponse{
			UserID:     user.ID,
			UserName:   user.Name,
			UserStatus: string(user.Status),
		}
	}

	// if user isn't in league then reject request
	if !foundUser {
		return util.MessageResponse(403, "unauthorized to fetch league details"), nil
	}

	// fetch season picks/results
	leaguePicks, err := h.racePicksRepository.GetLeaguePicks(ctx, leagueID)
	if err != nil {
		return util.MessageResponse(500, "failed to fetch league-wide picks"), err
	}
	seasonResults, err := h.raceResultsRepository.GetSeasonResults(ctx, league.Season)
	if err != nil {
		return util.MessageResponse(500, "failed to fetch season results"), err
	}

	// calculate season scoreboard
	scores := domain.CalculateSeasonScores(leaguePicks, seasonResults)
	for _, member := range resp.LeagueMembers {
		userScore, ok := scores[member.UserID]
		if !ok {
			userScore = &domain.SeasonScore{
				TotalScore:   0,
				AverageScore: 0,
				BestScore:    0,
				WorstScore:   0,
			}
		}
		member.AverageScore = userScore.AverageScore
		member.TotalScore = userScore.TotalScore
		member.BestScore = userScore.BestScore
		member.WorstScore = userScore.WorstScore
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
	leaguesRepository     dynamo.LeaguesRepository
	racePicksRepository   dynamo.RacePicksRepository
	raceResultsRepository dynamo.RaceResultsRepository
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
		leaguesRepository:     dynamo.NewLeaguesRepository(sess),
		racePicksRepository:   dynamo.NewRacePicksRepository(sess),
		raceResultsRepository: dynamo.NewRaceResultsRepository(sess),
	}
}

func main() {
	handler := newGetLeagueDetailsHandler()
	lambda.Start(handler.Handle)
}
