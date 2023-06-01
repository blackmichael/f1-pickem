package main

import (
	"blackmichael/f1-pickem/pkg/client"
	"blackmichael/f1-pickem/pkg/domain"
	"blackmichael/f1-pickem/pkg/dynamo"
	"blackmichael/f1-pickem/pkg/util"
	"context"
	"encoding/json"
	"log"
	"strconv"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/request"
	"github.com/aws/aws-sdk-go/aws/session"
)

type RacesResponse struct {
	Races domain.Races `json:"races"`
}

func (h getRacesHandler) Handle(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	log.Printf("incoming request: %s\n", request.PathParameters)

	season, ok := request.PathParameters["season"]
	if !ok {
		return util.MessageResponse(400, "missing path parameter: season"), nil
	}

	// read race data from db
	races, err := h.racesRepository.GetRaces(ctx, season)
	if err != nil {
		return util.MessageResponse(500, "failed to get race data"), err
	}

	if races == nil {
		// if races are not available, fetch them from api
		races, err = h.raceDataClient.GetRaces(ctx, season)
		if err != nil {
			return util.MessageResponse(500, "unable to get races"), err
		}

		if races == nil {
			// send a 204 - we don't have results available
			return events.APIGatewayProxyResponse{
				StatusCode: 204,
				Headers:    util.CorsHeaders,
			}, nil
		}

		// ergast api sucks butt and modified the schedule and race IDs so here's a hack to unbreak everything
		if season == "2023" {
			for _, race := range races {
				raceNumber, err := strconv.Atoi(race.RaceNumber)
				if err != nil {
					log.Printf("FAILURE: ergast api returned unexpect race data (%+v)\n", *race)
					continue
				}

				if raceNumber >= 6 {
					race.RaceNumber = strconv.FormatInt(int64(raceNumber+1), 10)
					race.RaceId = domain.GetRaceId(season, race.RaceNumber)
				}
			}
		}

		// if api has results, write them to db
		err = h.racesRepository.SaveRaces(ctx, races)
		if err != nil {
			return util.MessageResponse(500, "failed to save race data"), err
		}
	}

	response, err := json.Marshal(RacesResponse{
		Races: races,
	})
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

type getRacesHandler struct {
	sess            *session.Session
	racesRepository dynamo.RacesRepository
	raceDataClient  client.RaceDataClient
}

func newGetRacesHandler() *getRacesHandler {
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

	return &getRacesHandler{
		sess:            sess,
		racesRepository: dynamo.NewRacesRepository(sess),
		raceDataClient:  client.NewErgastClient(util.ERGAST_URL),
	}
}

func main() {
	handler := newGetRacesHandler()
	lambda.Start(handler.Handle)
}
