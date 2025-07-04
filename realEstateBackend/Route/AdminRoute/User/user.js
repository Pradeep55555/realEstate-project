const express = require('express');
const  userRouter = express.Router();

const {getUser , addUser , deleteUser , updateUser} = require('../../../Controller/AdminController/User/user.js');

userRouter.get('/api/user', getUser);
userRouter.post('/api/user', addUser);
userRouter.delete('/api/user', deleteUser);
userRouter.patch('/api/user/:user_id', updateUser);

module.exports = userRouter;