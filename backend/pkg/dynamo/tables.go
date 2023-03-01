package dynamo

import "github.com/aws/aws-sdk-go/aws"

var (
	usersLeaguesTableName = aws.String("Users-Leagues")
	racePicksTableName    = aws.String("RacePicks")
	raceResultsTableName  = aws.String("RaceResults")
	racesTableName        = aws.String("Races")

	leagueUserIndexName = aws.String("League-User-index")
)
