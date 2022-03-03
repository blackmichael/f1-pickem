package main

import (
	"context"
	"encoding/json"
	"errors"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Request struct {
	UserId string `json:"userId"`
}

type Response struct {
	Leagues []LeagueResponse `json:"leagues"`
}

type LeagueResponse struct {
	Id           string `json:"id"`
	Name         string `json:"name"`
	NumOfMembers int    `json:"num_of_members"`
	Season       string `json:"season"`
}

func Handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	log.Println("Lambda request", request.RequestContext.RequestID)
	log.Println("Request body", request.Body)

	resp := Response{
		Leagues: []LeagueResponse{
			{
				Id:           "1",
				Name:         "Fast Boiz",
				NumOfMembers: 8,
				Season:       "2021",
			},
			{
				Id:           "2",
				Name:         "MCLAREN Fan Club",
				NumOfMembers: 4,
				Season:       "2022",
			},
			{
				Id:           "3",
				Name:         "Drive To Survive",
				NumOfMembers: 10,
				Season:       "2017",
			},
		},
	}

	respStr, err := json.Marshal(resp)
	if err != nil {
		return events.APIGatewayProxyResponse{}, errors.New("unable to serialize response")
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       string(respStr),
		Headers: map[string]string{
			"Access-Control-Allow-Origin": "*",
		},
	}, nil
}

func main() {
	lambda.Start(Handler)
}
