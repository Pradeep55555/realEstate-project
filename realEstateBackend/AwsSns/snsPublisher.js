
const { PublishCommand } = require("@aws-sdk/client-sns");
const snsClient = require("./awsConfig");
require("dotenv").config();

const publishSNSMessage = async (message, subject = "RealEstate Notification") => {
  const params = {
    Message: message,
    Subject: subject,
    TopicArn: process.env.SNS_TOPIC_ARN,
  };

  try {
    const command = new PublishCommand(params);
    const response = await snsClient.send(command);
    console.log(" SNS message sent on Email . MessageId:", response.MessageId);
  } catch (error) {
    console.error(" SNS Publish Error:", error);
  }
};

module.exports = publishSNSMessage;
