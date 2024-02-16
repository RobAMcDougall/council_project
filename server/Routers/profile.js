const { Router } = require('express');

const profileController = require('../Controller/profile');
const authenticator = require('../Middleware/authenticator');
const authorizer = require('../Middleware/authorization');


const profileRouter = Router();

profileRouter.get("/", (req, res) => {
    res.send("This is the user profile page");
});
profileRouter.get("/previous/:username", profileController.getPrevious);
profileRouter.get("/upcoming/:username", profileController.getUpcoming);
profileRouter.get("/userInfo/:username",  profileController.getUserInfo);
profileRouter.patch("/aboutMe/:id", profileController.addingAboutMe);
profileRouter.patch("/skills/:id", profileController.addingSkills);

module.exports = profileRouter;



