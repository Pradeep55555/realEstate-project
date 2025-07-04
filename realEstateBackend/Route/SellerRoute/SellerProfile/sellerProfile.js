const express = require('express');
const  sellerProfileRouter = express.Router();
const uploadProfile = require("../../../Controller/SellerController/SellerProfile/multerProfile.js");

const { getSellerDetails , postSellerProfile} = require('../../../Controller/SellerController/SellerProfile/sellerProfile.js');

sellerProfileRouter.get('/api/seller/details/:mobile', getSellerDetails);
sellerProfileRouter.post('/api/seller/details', uploadProfile.single('photo'),postSellerProfile);

module.exports = sellerProfileRouter;