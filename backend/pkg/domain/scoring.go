package domain

import (
	"log"
	"unicode"

	"golang.org/x/text/runes"
	"golang.org/x/text/transform"
	"golang.org/x/text/unicode/norm"
)

type driverPoints struct {
	Driver         string `json:"driver"`
	PickedPosition int    `json:"picked_position"`
	ActualPosition int    `json:"actual_position"`
	Points         int    `json:"points"`
}

type RaceScore struct {
	UserId     string          `json:"user_id"`
	TotalScore int             `json:"total_score"`
	Breakdown  []*driverPoints `json:"breakdown"`
}

type RaceScorer struct {
	pointSpread      []int
	processedResults map[string]int
}

func removeAccents(name string) string {
	transformer := transform.Chain(norm.NFD, runes.Remove(runes.In(unicode.Mn)), norm.NFC)
	transformedName, _, err := transform.String(transformer, name)
	if err != nil {
		log.Printf("Failed to remove accents from name: %s", name)
		return name
	}

	return transformedName
}

func NewRaceScorer(results *RaceResults) *RaceScorer {
	processedResults := make(map[string]int)
	for i, driver := range results.Results {
		processedResults[removeAccents(driver)] = i
	}

	return &RaceScorer{
		pointSpread:      []int{25, 18, 15, 12, 10, 8, 6, 4, 2, 1},
		processedResults: processedResults,
	}
}

func (rc *RaceScorer) GetScore(picks *RacePicks) *RaceScore {
	score := 0

	scores := make([]*driverPoints, 0)
	for pickedPos, driver := range picks.Picks {
		actualPos, ok := rc.processedResults[removeAccents(driver)]
		if !ok {
			actualPos = -1
		}

		driverScore := rc.getDriverPoints(driver, pickedPos, actualPos)
		score += driverScore.Points
		scores = append(scores, driverScore)
	}

	return &RaceScore{
		UserId:     picks.UserId,
		TotalScore: score,
		Breakdown:  scores,
	}
}

func (rc *RaceScorer) getDriverPoints(driver string, pickedPos int, actualPos int) *driverPoints {
	score := 0
	diff := abs(pickedPos - actualPos)

	// if the driver was picked in the top 10, calculate their score
	if diff <= 9 && actualPos != -1 {
		score = rc.pointSpread[diff]
	}

	return &driverPoints{
		Driver:         driver,
		PickedPosition: pickedPos,
		ActualPosition: actualPos,
		Points:         score,
	}
}

func abs(x int) int {
	if x < 0 {
		return -x
	}

	return x
}
