const { Router } = require('express');

const postController = require('../Controller/posts');
const authenticator = require('../Middleware/authenticator');
const authorizer = require('../Middleware/authorization');

const postRouter = Router();

postRouter.get("/", postController.index);
postRouter.get("/upcoming", postController.getUpcoming)
postRouter.get("/activityType/:type", postController.showByType);
postRouter.get("/activityName/:name", postController.showByName);
postRouter.get("/activityDate/:date", postController.showByDate);
postRouter.get("/activityId/:id", postController.showById);
postRouter.post("/", postController.volunteer)

module.exports = postRouter;
