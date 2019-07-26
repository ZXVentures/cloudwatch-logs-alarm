# cloudwatch-logs-alarm

This package can be deployed to an AWS Lambda to send messages to an SNS Topic which can act as an alarm for specific message types.

## Configuration

### Create SNS Topic

Create an SNS Topic and a subscription.  The ARN for the Topic will need to be added as an environment variable in the Lambda's configuration with the key `SNS_TOPIC_ARN`.

### CloudWatch Log Triggers

Once the Lambda is published, add CloudWatch Log triggers, with the appropriate filters.

For example, you might create a filter that looks like:

```
?ERROR ?Error ?error
```

Which will cause the Lambda to execute whenever a message is written to the selected Log Group with a matching word.

## Required Permissions

The Lambda will require that the execution role has permissions to publish to SNS Topics.  This needs to be done manually.

Configuring the CloudWatch Log triggers will automatically grant the execution role the proper permissions to read from the logs.