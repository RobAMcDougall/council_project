const { Router } = require('express');

const userController = require('../Controller/user');
const authenticator = require('../Middleware/authenticator');
const authorizer = require('../Middleware/authorization');

const userRouter = Router();

userRouter.get("/", authenticator, authorizer("user"), userController.index);
userRouter.get("/:name", userController.show);
userRouter.get("/:type", userController.showType);
userRouter.get("/:date", userController.showData); 

module.exports = userRouter;