#!make
include .env
export $(shell sed 's/=.*//' .env)

publish:
	rm -f build.zip
	zip -r ./build.zip *
	aws lambda update-function-code --function-name cloudwatch-logging-alarm --zip-file fileb://build.zip --region $(AWS_REGION)
