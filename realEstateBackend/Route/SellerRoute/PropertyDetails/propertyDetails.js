// const express = require('express');
// const  propertyDetailsRouter = express.Router();

// const {getPropertyDetails ,getAllProperty,  countProperty , postProperty } = require('../../../Controller/SellerController/PropertyDetails/propertyDetails.js');

// propertyDetailsRouter.get('/api/seller/property/details/:mobile', getPropertyDetails);
// propertyDetailsRouter.get('/api/sellers/all/property/details', getAllProperty);
// propertyDetailsRouter.get('/api/seller/property/count/:mobile', countProperty );
// propertyDetailsRouter.post('/api/seller/property/add', postProperty);

// module.exports = propertyDetailsRouter;

const express = require('express');
const  propertyDetailsRouter = express.Router();
const uploadImg = require('../../../Controller/SellerController/PropertyDetails/multerConfig.js')

const {getPropertyDetails ,getAllProperty,  countProperty , postProperty   , getPropertyTypes , getPropertyCategories , getPropertyPurpose} = require('../../../Controller/SellerController/PropertyDetails/propertyDetails.js');

propertyDetailsRouter.get('/api/seller/property/details/:mobile', getPropertyDetails);
propertyDetailsRouter.get('/api/sellers/all/property/details', getAllProperty);
propertyDetailsRouter.get('/api/seller/property/count/:mobile', countProperty );
propertyDetailsRouter.post('/api/seller/property/add',uploadImg.array('photos', 10), postProperty);

propertyDetailsRouter.get('/property-types', getPropertyTypes);
propertyDetailsRouter.get('/property-categories', getPropertyCategories);
propertyDetailsRouter.get('/property-purpose', getPropertyPurpose);


module.exports = propertyDetailsRouter;