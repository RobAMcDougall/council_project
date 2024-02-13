const { Router } = require('express');

const loginController = require('../Controller/login');

const loginRouter = Router();

loginRouter.post("/register", loginController.register);
loginRouter.post("/login", loginController.login);

module.exports = loginRouter;