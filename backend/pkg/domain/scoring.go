package domain

import (
	"log"
	"strings"
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
	UserName   string          `json:"user_name"`
	TotalScore int             `json:"total_score"`
	Breakdown  []*driverPoints `json:"breakdown"`
}

type SeasonScore struct {
	TotalScore   int     `json:"total_score"`
	AverageScore float32 `json:"average_score"`
	BestScore    int     `json:"best_score"`
	WorstScore   int     `json:"worst_score"`
	allScores    []int
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
		UserId:     picks.UserID,
		UserName:   picks.UserName,
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

// CalculateSeasonScores returns a lookup map of UserID to Season Score
func CalculateSeasonScores(seasonPicks []*RacePicks, seasonResults []*RaceResults) map[string]*SeasonScore {
	scores := map[string]*SeasonScore{}
	picksByRace := map[string][]*RacePicks{}

	// process picks and initialize scores
	for _, picks := range seasonPicks {
		components := strings.Split(picks.LeagueIdRaceId, "-")
		if len(components) != 2 {
			log.Printf("ERROR unexpected LeagueID-RaceID (%s)\n", picks.LeagueIdRaceId)
			return scores
		}
		raceID := components[1]
		picksByRace[raceID] = append(picksByRace[raceID], picks)
		if _, ok := scores[picks.UserID]; !ok {
			scores[picks.UserID] = &SeasonScore{
				TotalScore:   0,
				AverageScore: 0.0,
				BestScore:    0,
				WorstScore:   -1,
				allScores:    []int{},
			}
		}
	}

	// collect race scores
	for _, raceResults := range seasonResults {
		raceID := GetRaceId(raceResults.Season, raceResults.RaceNumber)
		raceScorer := NewRaceScorer(raceResults)

		for _, picks := range picksByRace[raceID] {
			score := raceScorer.GetScore(picks)
			scores[picks.UserID].allScores = append(scores[picks.UserID].allScores, score.TotalScore)
		}
	}

	// calculate stats
	for _, userScore := range scores {
		for _, userRaceScore := range userScore.allScores {
			// determine best score
			if userRaceScore > userScore.BestScore {
				userScore.BestScore = userRaceScore
			}

			// determine worst score
			if userScore.WorstScore == -1 || userRaceScore < userScore.WorstScore {
				userScore.WorstScore = userRaceScore
			}

			// add total
			userScore.TotalScore += userRaceScore
		}

		// calculate average
		userScore.AverageScore = float32(userScore.TotalScore) / float32(len(userScore.allScores))
	}

	return scores
}
