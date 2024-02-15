const { Router } = require('express');

const profileController = require('../Controller/profile');
const authenticator = require('../Middleware/authenticator');
const authorizer = require('../Middleware/authorization');


const profileRouter = Router();

profileRouter.get("/", (req, res) => {
    res.send("This is the user profile page");
});
profileRouter.get("/previous/:username",authenticator, authorizer("Volunteer"), profileController.getPrevious);
profileRouter.get("/upcoming/:username", authenticator, authorizer("Volunteer"), profileController.getUpcoming);
profileRouter.get("/userInfo/:username",  profileController.getUserInfo);


module.exports = profileRouter;



