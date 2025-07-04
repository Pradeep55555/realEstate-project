const AWS = require('aws-sdk');

// Configure AWS
AWS.config.update({ region: 'ap-south-1' });

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const queueUrl = 'https://sqs.us-east-1.amazonaws.com/108782083594/realEstateBuyerInterestQueue';

const sendBuyerInterest = async (buyerMobile, propertyNumber, sellerMobile) => {
  const params = {
    MessageBody: JSON.stringify({
      buyerMobile,
      propertyNumber,
      sellerMobile,
      timestamp: new Date().toISOString()
    }),
    QueueUrl: queueUrl
  };

  try {
    const data = await sqs.sendMessage(params).promise();
    console.log("Message sent successfully", data.MessageId);
  } catch (err) {
    console.error("Error sending message", err);
  }
};

// Example usage
sendBuyerInterest("9098678083", "P201", "9302840287");
