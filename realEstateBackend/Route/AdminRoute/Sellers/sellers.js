const express = require('express');
const  allSellersRouter = express.Router();

const {getAllSellers} = require('../../../Controller/AdminController/Sellers/sellers.js');

allSellersRouter.get('/all-sellers',getAllSellers);

module.exports = allSellersRouter;