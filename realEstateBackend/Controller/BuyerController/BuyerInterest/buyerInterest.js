
const connection = require('../../../Model/dbConnect.js');
require('dotenv').config();

const AWS = require('aws-sdk');
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


// Configure AWS
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const sns = new AWS.SNS({ apiVersion: '2010-03-31' });

const getBuyerInterest = (req, res) => {
  const buyer_mobile = req.params.buyer_mobile;

  const sql = `
    SELECT 
      bi.buyer_mobile,
      bi.property_number,
      bi.interested_on,
      bi.seller_mobile,
      pd.location,
      pd.city,
      pd.price
    FROM 
      buyer_interest bi
    JOIN 
      property_details pd 
    ON 
      bi.property_number = pd.property_number
    WHERE 
      bi.buyer_mobile = ?
    ORDER BY 
      bi.interested_on DESC
  `;

  connection.query(sql, [buyer_mobile], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.sqlMessage });
    }
    return res.status(200).json(result);
  });
};


// POST - Add buyer interest + direct SMS + notification record
const addBuyerInterest = (req, res) => {
  const { buyer_mobile, property_number, seller_mobile } = req.body;

  if (!buyer_mobile || !property_number || !seller_mobile) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `INSERT INTO buyer_interest (buyer_mobile, property_number, seller_mobile) VALUES (?, ?, ?)`;

  connection.query(sql, [buyer_mobile, property_number, seller_mobile], async (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(200).json({ message: "Interest already exists" });
      }
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Server error while saving interest" });
    }

    try {
      // Save notification record
      const notifySQL = `INSERT INTO notification_buyer_inquiry (seller_mobile, property_number, buyer_mobile) VALUES (?, ?, ?)`;
      connection.query(notifySQL, [seller_mobile, property_number, buyer_mobile], (notifyErr) => {
        if (notifyErr) {
          console.error("Error saving notification record:", notifyErr);
        }
      });

      // Send SMS directly
      await sendSmsToSeller({ sellerMobile: seller_mobile, buyerMobile: buyer_mobile, propertyNumber: property_number });

      return res.status(201).json({ message: "Interest saved, seller notified via SMS" });
    } catch (err) {
      console.error("Error in post-insert operations:", err);
      return res.status(500).json({ error: "Interest saved but SMS failed" });
    }
  });
};

// Send SMS using AWS SNS
const sendSmsToSeller = async ({ sellerMobile, buyerMobile, propertyNumber }) => {
  const params = {
    Message: `Buyer ${buyerMobile} is interested in your property ${propertyNumber}`,
    PhoneNumber: `+91${sellerMobile}`
  };

  try {
    const data = await sns.publish(params).promise();
    console.log("SMS sent successfully:", data.MessageId);
  } catch (err) {
    console.error("Error sending SMS:", err);
  }
};

// GET - Fetch buyers interested in this seller's properties
const getPropertyWiseBuyerDetails = (req, res) => {
  const seller_mobile = req.params.seller_mobile;
  const sql = `
    SELECT bi.property_number, b.full_name AS buyer_name, b.mobile AS buyer_mobile, b.email AS buyer_email, bi.interested_on
    FROM buyer_interest bi
    JOIN buyer b ON bi.buyer_mobile = b.mobile
    WHERE bi.seller_mobile = ?
  `;

  connection.query(sql, [seller_mobile], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    return res.status(200).json(result);
  });
};

// send msg buyer to seller with the help of twilio 

const buyerToSellerTwilioMsg = async (req, res) => {
  // const { buyer_mobile, seller_mobile, property_number, property_location, price, message } = req.body;
  const { buyer_mobile, seller_mobile, property_number, message } = req.body;
  console.log(req.body);

  if (!buyer_mobile || !seller_mobile || !property_number || !message) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  // Clean and validate seller mobile
  const cleanSelMobile = seller_mobile.replace(/\D/g, '');
  if (cleanSelMobile.length !== 10) {
    return res.status(400).json({ message: "Invalid seller mobile number." });
  }

  // Build the full seller number (India +91)
  const fullSellerNumber = `+91${cleanSelMobile}`;

  try {
    // Send SMS
     const twilioResponse = await client.messages.create({
      // body:
      //   `Buyer: ${buyer_mobile}\n` +
      //   `Property: ${property_number}\n` +
      //   `Location: ${property_location}\n` +
      //   `Price: ₹${price}\n\n` +
      //   `Message:\n${message}`,
      body: `Buyer ${buyer_mobile} is interested in property ${property_number}.\nMessage:\n${message}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: fullSellerNumber
    });

    console.log(`Message sent! SID: ${twilioResponse.sid}`);
    return res.status(200).json({ message: "SMS sent successfully.", sid: twilioResponse.sid });

  } catch (err) {
    console.error("Twilio error:", err);
    return res.status(500).json({ message: "Failed to send SMS.", error: err.message });
  }
};


module.exports = { getBuyerInterest, addBuyerInterest, getPropertyWiseBuyerDetails , buyerToSellerTwilioMsg};
