const express = require('express');
const buyerInterestRouter = express.Router();

const { getBuyerInterest , addBuyerInterest , getPropertyWiseBuyerDetails , buyerToSellerTwilioMsg } = require('../../../Controller/BuyerController/BuyerInterest/buyerInterest.js');

buyerInterestRouter.get('/api/buyer/interest/:buyer_mobile', getBuyerInterest);
buyerInterestRouter.post('/api/buyer/add-interest', addBuyerInterest);
buyerInterestRouter.get('/api/buyer/interested-details/:seller_mobile', getPropertyWiseBuyerDetails );
buyerInterestRouter.post('/api/buyer-interest/send-message', buyerToSellerTwilioMsg);  // for twillio msg send buyer to seller 

module.exports = buyerInterestRouter;
