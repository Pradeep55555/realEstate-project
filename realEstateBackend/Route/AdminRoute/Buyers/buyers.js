const express = require('express');
const  allBuyersRouter = express.Router();

const {getAllBuyers} = require('../../../Controller/AdminController/Buyers/buyers.js');

allBuyersRouter.get('/all-buyers',getAllBuyers);

module.exports = allBuyersRouter;