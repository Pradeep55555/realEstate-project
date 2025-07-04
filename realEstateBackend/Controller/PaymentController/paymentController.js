const Razorpay = require("razorpay");
require("dotenv").config();
const connection = require("../../Model/dbConnect");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

// Create Razorpay Order
const createOrder = async (req, res) => {
    const { amount, property_number } = req.body;

    const options = {
        amount: amount * 100, // Convert to paise
        currency: "INR",
        receipt: `receipt_order_${property_number}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error("Razorpay order error:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
};

// Verify Payment and Save Transaction

const verifyPayment = (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, property_number, buyer_mobile, amount } = req.body;
    const sql = "INSERT INTO transactions (property_number, buyer_mobile, payment_id, order_id, signature, amount) VALUES (?, ?, ?, ?, ?, ?)";

    connection.query( sql, [property_number, buyer_mobile, razorpay_payment_id, razorpay_order_id, razorpay_signature, amount],(err, result) => {
            if (err) {
                console.error("Transaction save failed:", err);
                return res.status(500).json({ success: false });
            }
            res.json({ success: true, transaction_id: result.insertId });
        }
    );
};

module.exports = { createOrder, verifyPayment };
