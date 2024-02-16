const { Router } = require('express');

const loginController = require('../Controller/loginManager');

const managerLoginRouter = Router();

managerLoginRouter.post("/manager/register", loginController.register);
managerLoginRouter.post("/manager/login", loginController.login);

module.exports = managerLoginRouter;