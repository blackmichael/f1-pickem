package util

import (
	"encoding/json"

	"github.com/aws/aws-lambda-go/events"
)

func MessageResponse(statusCode int, message string) events.APIGatewayProxyResponse {
	// ignore the error, response will be an empty byte array
	response, _ := json.Marshal(map[string]string{"message": message})

	return events.APIGatewayProxyResponse{
		StatusCode: statusCode,
		Body:       string(response),
		Headers:    CorsHeaders,
	}
}

var CorsHeaders = map[string]string{
	"Access-Control-Allow-Origin": "*",
}
