package domain

import "time"

type RacePicks struct {
	LeagueIdRaceId string    `dynamodbav:"LeagueID-RaceID"`
	UserId         string    `dynamodbav:"UserID"`
	Picks          []string  `dynamodbav:"Picks"`
	SubmittedAt    time.Time `dynamodbav:"SubmittedAt"`
}
