const { Router } = require('express');

const managerController = require('../Controller/manger');
const authenticator = require('../Middleware/authenticator');
const authorizer = require('../Middleware/authorization');

const managerRouter = Router();

managerRouter.get("/:name",authenticator,  authorizer("Manager"),  managerController.index);
managerRouter.post("/",authenticator,  authorizer("Manager"), managerController.create);
managerRouter.get("/activityName/:name",authenticator, authorizer("Manager"),  managerController.showByName);
managerRouter.get("/activityType/:type",authenticator,  authorizer("Manager"), managerController.showByType);
managerRouter.get("/activityDate/:date",authenticator, authorizer("Manager"),  managerController.showByDate);
managerRouter.get("/activityId/:id",authenticator, authorizer("Manager"),  managerController.showById);
managerRouter.delete("/activityId/:id",authenticator, authorizer("Manager"), managerController.destroy);
managerRouter.patch("/activityId/:id",authenticator,  authorizer("Manager"), managerController.update);

module.exports = managerRouter;

