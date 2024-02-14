const { Router } = require('express');

const postController = require('../Controller/posts');
const authenticator = require('../Middleware/authenticator');
const authorizer = require('../Middleware/authorization');

const postRouter = Router();

postRouter.get("/", postController.index);
postRouter.get("/:type", postController.showByType);
//postRouter.get("/:name",  postController. showByName);
postRouter.get("/:date",  postController.showByDate);
postRouter.get("/:id", postController.showById);

module.exports = postRouter;
