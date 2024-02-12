const { Router } = require('express');

const profileController = require('../Controller/posts');
const authenticator = require('../Middleware/authenticator');
const authorizer = require('../Middleware/authorization');


const profileRouter = Router();

profileRouter.get("/", authenticator, authorizer("user"), profileController.index);
profileRouter.get("/", profileController.show);
profileRouter.get("/", profileController.showPrevious);
profileRouter.get("/", profileController.showUpcoming);


module.exports = profileRouter;

//recent activity list upcoming and past 

