// const express = require('express');
// const  buyerRemarkRouter = express.Router();

// const {buyerRemark} = require('../../../Controller/SellerController/BuyerRemarks/buyerRemarks.js');

// buyerRemarkRouter.get('/api/buyer-remark/:property_number/:buyer_mobile', buyerRemark);

// module.exports = buyerRemarkRouter;

const express = require('express');
const buyerRemarkRouter = express.Router();

const { buyerRemark, addOrUpdateRemark } = require('../../../Controller/SellerController/BuyerRemarks/buyerRemarks.js');

buyerRemarkRouter.get('/api/buyer-remark/:property_number/:buyer_mobile', buyerRemark);
// Add or update remark API
buyerRemarkRouter.post('/api/buyer-remark', addOrUpdateRemark);

module.exports = buyerRemarkRouter;
