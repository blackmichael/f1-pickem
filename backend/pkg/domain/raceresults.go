package domain

type RaceResults struct {
	Season     string   `dynamodbav:"Season"`
	RaceNumber string   `dynamodbav:"RaceNumber"`
	RaceDate   string   `dynamodbav:"RaceDate"`
	Results    []string `dynamodbav:"Results"`
}
