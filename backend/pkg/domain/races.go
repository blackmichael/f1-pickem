package domain

import (
	"time"
)

type Race struct {
	// Partition Key
	Season string `dynamodbav:"Season" json:"season"`
	// Sort Key
	RaceNumber string    `dynamodbav:"RaceNumber" json:"race_number"`
	RaceId     string    `dynamodbav:"RaceID" json:"id"`
	RaceName   string    `dynamodbav:"RaceName" json:"race_name"`
	RaceDate   string    `dynamodbav:"RaceDate" json:"race_date"`
	StartTime  time.Time `dynamodbav:"StartTime" json:"start_time"`
}

type Races []*Race

func GetRaceId(season, raceNumber string) string {
	return season + raceNumber
}