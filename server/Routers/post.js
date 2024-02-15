const { Router } = require('express');

const postController = require('../Controller/posts');
const authenticator = require('../Middleware/authenticator');
const authorizer = require('../Middleware/authorization');

const postRouter = Router();

postRouter.get("/", authenticator, postController.index);
postRouter.get("/upcoming", authenticator, postController.getUpcoming)
postRouter.get("/activityType/:type", authenticator, postController.showByType);
postRouter.get("/activityName/:name",  authenticator, postController.showByName);
postRouter.get("/activityDate/:date",  authenticator, postController.showByDate);
postRouter.get("/activityId/:id", authenticator, postController.showById);

module.exports = postRouter;
