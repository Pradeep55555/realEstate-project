const express = require('express');
const  userRoleRouter = express.Router();

const {getUserRole , assignUserRole , deleteUserRole} = require('../../../Controller/AdminController/RoleAssign/roleAssign.js');

userRoleRouter.get('/api/userrole', getUserRole);
userRoleRouter.post('/api/userrole', assignUserRole);
userRoleRouter.delete('/api/userrole', deleteUserRole);

module.exports = userRoleRouter;