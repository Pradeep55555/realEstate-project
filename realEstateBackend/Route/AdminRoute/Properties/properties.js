const express = require('express');
const  allPropertiesRouter = express.Router();

const {getAllProperties , getTopBuyer , getTopSeller , getMostDemandedPropertyType} = require('../../../Controller/AdminController/Properties/properties.js');

allPropertiesRouter.get('/all-properties',getAllProperties);
allPropertiesRouter.get('/top-buyer',getTopBuyer);
allPropertiesRouter.get('/top-seller',getTopSeller);
allPropertiesRouter.get('/most-demanded-property-type',getMostDemandedPropertyType);

module.exports = allPropertiesRouter;