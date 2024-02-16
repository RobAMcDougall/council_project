const { Router } = require('express');

const loginController = require('../Controller/login');

const loginRouter = Router();

loginRouter.post("/volunteer/register", loginController.register);
loginRouter.post("/volunteer/login", loginController.login);

module.exports = loginRouter;