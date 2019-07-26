require('dotenv').config();

const zlib = require('zlib'),
    AWS = require('aws-sdk');

const SNS_TOPIC_ARN = process.env.SNS_TOPIC_ARN,
      AWS_REGION = process.env.AWS_REGION;

AWS.config.update({ region: AWS_REGION });

exports.handler = async (event, context) => {

    const payload = new Buffer(event.awslogs.data, 'base64');
    const parsed = JSON.parse(zlib.gunzipSync(payload).toString('utf8'));
    console.log('Decoded payload:', JSON.stringify(parsed));

    const { logGroup, logStream } = parsed;

    for(const event of parsed.logEvents){
        const { message } = event;

        // Create publish parameters
        var params = {
            Message: `LOG GROUP: ${logGroup} \nLOG STREAM: ${logStream} \nMESSAGE: ${message}`,
            TopicArn: SNS_TOPIC_ARN
        };

        // Create promise and SNS service object
        let data = await new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
        
        console.log(`Message ${params.Message} send sent to the topic ${params.TopicArn}`);
        console.log("MessageID is " + data.MessageId);
    }

    return `Successfully processed ${parsed.logEvents.length} log events.`;
};
