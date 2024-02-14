const { Router } = require('express');

const managerController = require('../Controller/manger');
const authenticator = require('../Middleware/authenticator');
const authorizer = require('../Middleware/authorization');

const managerRouter = Router();

managerRouter.get("/", authenticator, authorizer("manager"), managerController.index);
managerRouter.post("/", authenticator, authorizer("manager"),managerController.create);
managerRouter.get("/activityName/:name", authenticator, authorizer("manager"),managerController.showByName);
managerRouter.get("/activityType/:type", authenticator, authorizer("manager"),managerController.showByType);
managerRouter.get("/activityDate/:date", authenticator, authorizer("manager"),managerController.showByDate);
managerRouter.get("/activityId/:id", authenticator, authorizer("manager"),managerController.showById);
managerRouter.delete("/activityId/:id",authenticator, authorizer("manager"),managerController.destroy);
managerRouter.patch("/activityId/:id", authenticator, authorizer("manager"),managerController.update);

module.exports = managerRouter;

