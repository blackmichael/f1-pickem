package domain

import "time"

type RacePicks struct {
	LeagueIdRaceId string    `dynamodbav:"LeagueID-RaceID"`
	UserID         string    `dynamodbav:"UserID"`
	UserName       string    `dynamodbav:"UserName"`
	Picks          []string  `dynamodbav:"Picks"`
	SubmittedAt    time.Time `dynamodbav:"SubmittedAt"`
}
