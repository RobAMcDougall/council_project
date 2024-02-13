const { Router } = require('express');

const profileController = require('../Controller/profile');
const authenticator = require('../Middleware/authenticator');
const authorizer = require('../Middleware/authorization');


const profileRouter = Router();

profileRouter.get("/", authenticator, authorizer("user"), (req, res) => {
    res.send("This is the user profile page");
});
profileRouter.get("/previous", authenticator, authorizer("user"), profileController.getPrevious);
profileRouter.get("/upcoming", authenticator, authorizer("user"), profileController.getUpcoming);
profileRouter.get("/userInfo", authenticator, authorizer("user"), profileController.getUserInfo);


module.exports = profileRouter;



