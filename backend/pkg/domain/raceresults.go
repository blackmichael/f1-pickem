package domain

type RaceResults struct {
	RaceID  string   `dynamodbav:"RaceID"`
	Season  string   `dynamodbav:"Season"`
	Results []string `dynamodbav:"Results"`
}
