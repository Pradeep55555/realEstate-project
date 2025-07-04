//  when buyer save property send sms to seller

const express = require('express');
const AWS = require('aws-sdk');
require('dotenv').config();

const buyerSendMsgRouter = express.Router();

// Configure AWS SNS
AWS.config.update({
  region: process.env.AWS_REGION, 
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const sns = new AWS.SNS();

buyerSendMsgRouter.post('/api/buyer/send-message', async (req, res) => {
  const { buyer_mobile, seller_mobile, property_number, message } = req.body;
  console.log(req.body);

  if (!buyer_mobile || !seller_mobile || !message) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const cleanSellerMobile = seller_mobile.replace(/\D/g, '');
    if (cleanSellerMobile.length !== 10) {
      return res.status(400).json({ message: "Invalid seller mobile number." });
    }

    const smsBody = 
      `Buyer ${buyer_mobile} is interested in your property ${property_number}.\nMessage: ${message}`;

    const params = {
      Message: smsBody.slice(0, 140),  // SMS character limit
      PhoneNumber: `+91${cleanSellerMobile}`
    };

    const result = await sns.publish(params).promise();
    console.log("SNS sent:", result);

    return res.status(200).json({ message: "SMS sent successfully.", messageId: result.MessageId });

  } catch (err) {
    console.error("SNS Error:", err);
    return res.status(500).json({ message: "Failed to send SMS.", error: err.message });
  }
});

module.exports = buyerSendMsgRouter;
