OUTPUT = main # Referenced as Handler in template.yaml
PACKAGED_TEMPLATE = packaged.yaml
S3_BUCKET = aws-sam-cli-managed-default-samclisourcebucket-x8wpzusjymdw
STACK_NAME := f1pickem
TEMPLATE = template.yaml

.PHONY: test
test:
	go test ./...

.PHONY: clean
clean:
	rm -f $(PACKAGED_TEMPLATE) \
		get-leagues \
		submit-picks

.PHONY: install
install:
	go get ./...

local:
	go build -o get-leagues ./cmd/get-leagues/main.go
	go build -o submit-picks ./cmd/submit-picks/main.go

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
	sam local start-api

.PHONY: package
package: build/lambda
	sam package --template-file $(TEMPLATE) --s3-bucket $(S3_BUCKET) --output-template-file $(PACKAGED_TEMPLATE)

.PHONY: deploy
deploy: package
	sam deploy --stack-name $(STACK_NAME) --template-file $(PACKAGED_TEMPLATE) --capabilities CAPABILITY_IAM
