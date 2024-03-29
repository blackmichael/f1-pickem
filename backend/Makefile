PACKAGED_TEMPLATE = packaged.yaml
S3_BUCKET = aws-sam-cli-managed-default-samclisourcebucket-x8wpzusjymdw
STACK_NAME := f1pickem
TEMPLATE = template.yaml

.PHONY: test
test:
	go test ./...

.PHONY: clean
clean:
	rm -f $(PACKAGED_TEMPLATE) *.out

.PHONY: install
install:
	go get ./...

local:
	go build -o get-leagues.out ./cmd/get-leagues/main.go
	go build -o submit-picks.out ./cmd/submit-picks/main.go
	go build -o fetch-race-results.out ./cmd/fetch-race-results/main.go
	go build -o get-race-scores.out ./cmd/get-race-scores/main.go
	go build -o get-races.out ./cmd/get-races/main.go
	go build -o create-league.out ./cmd/create-league/main.go
	go build -o join-league.out ./cmd/join-league/main.go
	go build -o get-league-details.out ./cmd/get-league-details/main.go
	go build -o refresh-league-token.out ./cmd/refresh-league-token/main.go

# compile the code to run in Lambda (local or real)
.PHONY: lambda
lambda:
	GOOS=linux GOARCH=amd64 $(MAKE) local

.PHONY: build
build: clean local

.PHONY: build/lambda
build/lambda: clean lambda

.PHONY: fmt
fmt:
	gofmt -w -l .

.PHONY: api
api: build/lambda
	sam local start-api -p 3001

.PHONY: package
package: build/lambda
	sam package --template-file $(TEMPLATE) --s3-bucket $(S3_BUCKET) --output-template-file $(PACKAGED_TEMPLATE)

.PHONY: deploy
deploy: package
	sam deploy --stack-name $(STACK_NAME) --template-file $(PACKAGED_TEMPLATE) --capabilities CAPABILITY_IAM
