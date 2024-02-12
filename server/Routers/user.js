const { Router } = require('express');

const userController = require('../Controller/user');
const authenticator = require('../Middleware/authenticator');
const authorizer = require('../Middleware/authorization');

const userRouter = Router();

userRouter.get("/", authenticator, authorizer("user"), userController.index);
  