const { Router } = require('express');

const postController = require('../Controller/posts');
const authenticator = require('../Middleware/authenticator');
const authorizer = require('../Middleware/authorization');

const postRouter = Router();

postRouter.get("/", authenticator, authorizer("user"), userController.index);
postRouter.get("/:name", postController.show);
postRouter.get("/:type", postController.showType);
postRouter.get("/:date", postController.showData);
postRouter.get("/:id", postController.showId);

module.exports = postRouter;
