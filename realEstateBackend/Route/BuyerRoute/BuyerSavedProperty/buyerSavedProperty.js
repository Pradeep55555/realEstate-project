const express = require('express');
const savedPropertyRouter = express.Router();

const { addSavedProperty , getBuyerSavedProperty } = require('../../../Controller/BuyerController/BuyerPropertySaved/buyerPropertySaved.js');

savedPropertyRouter.get('/api/buyer/save-property/:mobile', getBuyerSavedProperty);
savedPropertyRouter.post('/api/buyer/save-property', addSavedProperty);

module.exports = savedPropertyRouter ;
