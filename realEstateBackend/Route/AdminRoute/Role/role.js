const express = require('express');
const  roleRouter = express.Router();

const {getRole , addRole , deleteRole , updateRole} = require('../../../Controller/AdminController/Role/role.js');

roleRouter.get('/api/role', getRole);
roleRouter.post('/api/role', addRole);
roleRouter.delete('/api/role', deleteRole);
roleRouter.patch('/api/role/:rid', updateRole);

module.exports = roleRouter;