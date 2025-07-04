const express = require('express');
const propertyNotificationRouter = express.Router();

const {  getNotificationsForSeller , deleteNotificationsForSeller} = require('../../../Controller/SellerController/NotificationProperty/propertyNotification.js');

propertyNotificationRouter.get('/notifications/:seller_mobile', getNotificationsForSeller );
propertyNotificationRouter.put('/notifications/viewed', deleteNotificationsForSeller ); // delete notification

module.exports = propertyNotificationRouter;
