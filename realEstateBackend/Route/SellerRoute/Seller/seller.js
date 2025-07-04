const express = require('express');
const  sellerRouter = express.Router();

const {loginSeller , registerSeller , getSeller , changePasswordSeller , sendOtpToEmail , verifyOtpAndResetPassword} = require('../../../Controller/SellerController/Seller/seller.js');

sellerRouter.post('/api/seller/login', loginSeller);
sellerRouter.post('/api/seller/signup', registerSeller);
sellerRouter.get('/api/seller/info/:mobile', getSeller);
sellerRouter.put('/api/seller/change-password/:mobile',changePasswordSeller);
sellerRouter.post('/seller/send-otp', sendOtpToEmail);
sellerRouter.post('/seller/verify-otp-reset-password', verifyOtpAndResetPassword);


module.exports = sellerRouter;