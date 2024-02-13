const { Router } = require('express');

const loginController = require('../Controller/loginManager');

const managerLoginRouter = Router();

managerLoginRouter.post("/register", loginController.register);
managerLoginRouter.post("/login", loginController.login);

module.exports = managerLoginRouter;