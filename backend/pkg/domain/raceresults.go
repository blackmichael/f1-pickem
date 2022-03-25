package domain

type RaceResults struct {
	Season     string   `dynamodbav:"Season" json:"season"`
	RaceNumber string   `dynamodbav:"RaceNumber" json:"race_number"`
	RaceDate   string   `dynamodbav:"RaceDate" json:"race_date"`
	Results    []string `dynamodbav:"Results" json:"results"`
}
