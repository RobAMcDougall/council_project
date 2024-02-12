const { Router } = require('express');

const managerController = require('../Controller/manger');
const authenticator = require('../Middleware/authenticator');
const authorizer = require('../Middleware/authorization');

const managerRouter = Router();

managerRouter.get("/", authenticator, authorizer("manager"), managerController.index);
managerRouter.post("/", managerController.create);
managerRouter.get("/:name", managerController.show);
managerRouter.get("/:type", managerController.showType);
managerRouter.get("/:date", managerController.showData);
managerRouter.get("/:id", managerController.showId);
managerRouter.delete("/:id",managerController.destroy);
managerRouter.update("/:id", managerController.update);

module.exports = managerRouter;
