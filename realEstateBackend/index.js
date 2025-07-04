

const express = require('express');
const cors = require('cors');
const path = require('path');

const realEstate = express();
const port = 4000;

realEstate.use(express.json());

// Static files
realEstate.use('/assets', express.static('assets'));

// CORS setup
// realEstate.use(cors())
realEstate.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
    credentials: true
}));

//********************   Admin    **************************//
const userRouter = require("./Route/AdminRoute/User/user.js");
const roleRouter = require("./Route/AdminRoute/Role/role.js");
const userRoleRouter = require("./Route/AdminRoute/RoleAssign/roleAssign.js");

const allSellersRouter = require("./Route/AdminRoute/Sellers/sellers.js");
const allBuyersRouter = require("./Route/AdminRoute/Buyers/buyers.js");
const allPropertiesRouter = require("./Route/AdminRoute/Properties/properties.js");

//********************   Seller   **************************//
const sellerRouter = require("./Route/SellerRoute/Seller/seller.js");
const sellerProfileRouter = require("./Route/SellerRoute/SellerProfile/sellerProfile.js");
const propertyDetailsRouter = require("./Route/SellerRoute/PropertyDetails/propertyDetails.js");
const buyerRemarkRouter = require("./Route/SellerRoute/BuyerRemarks/buyerRemarks.js");
const propertyNotificationRouter = require("./Route/SellerRoute/NotificationProperty/propertyNotification.js");

//********************   Buyer   **************************//
const buyerRouter = require("./Route/BuyerRoute/Buyer/buyer.js");
const buyerInterestRouter = require('./Route/BuyerRoute/BuyerInterest/buyerInterest.js')
const savedPropertyRouter = require('./Route/BuyerRoute/BuyerSavedProperty/buyerSavedProperty.js')

const buyerSendMsgRouter = require('./Controller/BuyerController/AwsService/awsSns.js')

//********************   Payment   **************************//

const paymentRouter = require("./Route/PaymentRouter/paymentRouter.js");

//********************   Register Routes   **************************//

realEstate.use('/', userRouter);
realEstate.use('/', roleRouter);
realEstate.use('/', userRoleRouter);
realEstate.use('/', allSellersRouter);
realEstate.use('/', allBuyersRouter);
realEstate.use('/', allPropertiesRouter);

realEstate.use('/', sellerRouter);
realEstate.use('/', sellerProfileRouter);
realEstate.use('/', propertyDetailsRouter);
realEstate.use('/', buyerRemarkRouter);
realEstate.use('/', propertyNotificationRouter);

realEstate.use('/', buyerRouter);
realEstate.use('/', buyerInterestRouter);
realEstate.use('/', savedPropertyRouter);

realEstate.use('/', buyerSendMsgRouter)

realEstate.use("/", paymentRouter);

//*********************************************************//
realEstate.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

