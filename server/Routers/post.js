const { Router } = require('express');

const postController = require('../Controller/posts');
const authenticator = require('../Middleware/authenticator');
const authorizer = require('../Middleware/authorization');

const postRouter = Router();

postRouter.get("/", authenticator, authorizer("user"), postController.index);
postRouter.get("/:name", authenticator, authorizer("user"), postController. showByName);
postRouter.get("/:type", authenticator, authorizer("user"), postController.showByType);
postRouter.get("/:date", authenticator, authorizer("user"), postController.showByDate);
postRouter.get("/:id", authenticator, authorizer("user"), postController.showById);

module.exports = postRouter;
