const { Router } = require('express');

const postController = require('../Controller/posts');

const postRouter = Router();

postRouter.post("/", postController.create);
postRouter.get("/:name", postController.show);
postRouter.get("/:type", postController.showType);
postRouter.get("/:date", postController.showData);
postRouter.get("/:id", postController.showId);

module.exports = postRouter;