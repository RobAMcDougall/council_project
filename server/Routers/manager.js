const { Router } = require('express');

const managerController = require('../Controller/manger');
const authenticator = require('../Middleware/authenticator');
const authorizer = require('../Middleware/authorization');

const managerRouter = Router();

managerRouter.get("/", authenticator, authorizer("manager"), managerController.index);
managerRouter.post("/", authenticator, authorizer("manager"),managerController.create);
managerRouter.get("/:name", authenticator, authorizer("manager"),managerController.showByName);
managerRouter.get("/:type", authenticator, authorizer("manager"),managerController.showByType);
managerRouter.get("/:date", authenticator, authorizer("manager"),managerController.showByDate);
managerRouter.get("/:id", authenticator, authorizer("manager"),managerController.showById);
managerRouter.delete("/:id",authenticator, authorizer("manager"),managerController.destroy);
managerRouter.update("/:id", authenticator, authorizer("manager"),managerController.update);

module.exports = managerRouter;

