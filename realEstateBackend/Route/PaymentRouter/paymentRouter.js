const express = require("express");
const paymentRouter = express.Router();

const {createOrder,verifyPayment} = require("../../Controller/PaymentController/paymentController.js");

paymentRouter.post("/api/payment/order", createOrder);
paymentRouter.post("/api/payment/verify", verifyPayment);

module.exports = paymentRouter;
