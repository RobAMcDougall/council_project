const { Router } = require('express');

const managerController = require('../Controller/manger');
const authenticator = require('../Middleware/authenticator');
const authorizer = require('../Middleware/authorization');

const managerRouter = Router();

managerRouter.get("/:name",  managerController.index);
managerRouter.post("/", managerController.create);
managerRouter.get("/activityName/:name", managerController.showByName);
managerRouter.get("/activityType/:type", managerController.showByType);
managerRouter.get("/activityDate/:date", managerController.showByDate);
managerRouter.get("/activityId/:id", managerController.showById);
managerRouter.delete("/activityId/:id",managerController.destroy);
managerRouter.patch("/activityId/:id", managerController.update);

module.exports = managerRouter;

