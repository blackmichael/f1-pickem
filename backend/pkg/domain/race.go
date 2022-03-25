package domain

import (
	"time"
)

type Race struct {
	RaceId     string    `dynamodbav:"RaceID"`
	RaceNumber string    `dynamodbav:"RaceNumber"`
	RaceDate   string    `dynamodbav:"RaceDate"`
	StartTime  time.Time `dynamodbav:"StartTime"`
	Results    []string  `dynamodbav:"Results"`
}

func GetRaceId(season, raceNumber string) string {
	return season + raceNumber
}
