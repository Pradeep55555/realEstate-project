const express = require('express');
const buyerRouter = express.Router();

const { registerBuyer , loginBuyer , googleLoginBuyer , githubLoginBuyer,  getBuyer , sendOtpBuyer , resetPasswordBuyer} = require('../../../Controller/BuyerController/Buyer/buyer.js');

buyerRouter.post('/api/buyer/signup', registerBuyer);
buyerRouter.post('/api/buyer/login', loginBuyer);
buyerRouter.post("/google-login", googleLoginBuyer);
buyerRouter.post("/github-login", githubLoginBuyer);
buyerRouter.post("/buyer/send-otp", sendOtpBuyer);
buyerRouter.post("/buyer/reset-password", resetPasswordBuyer);

buyerRouter.get('/api/buyer/:mobile', getBuyer);

module.exports = buyerRouter;
