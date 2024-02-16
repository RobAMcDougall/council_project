// getPrevious
// getUpcoming
const Profile = require("../Models/Profile");

async function getUserInfo(req, res) {
  try {
    let username = req.params.username;
    const userInfo = await Profile.getUserInfo(username);
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
async function getPrevious(req, res) {
  try {
    let username = req.params.username;
    const previous = await Profile.PreviousVolunteering(username);
    res.status(200).json(previous);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
async function getUpcoming(req, res) {
  try {
    let username = req.params.username;
    const upcoming = await Profile.upcomingVolunteering(username);
    res.status(200).json(upcoming);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
async function addingAboutMe(req, res){
  try{
    console.log(34)
    const id = parseInt(req.params.id);
    const data = req.body
    const profile = await Profile.updatingAboutMe(id, data)
    res.status(200).json(profile)
  }catch(error){
    res.status(404).json({ "error": error.message })
  }
}
async function addingSkills(req, res){
  try{
    const id = parseInt(req.params.id);
    const data = req.body
    const profile = await Profile.updateSkills(id, data)
    res.status(200).json(profile)
  }catch(error){
    res.status(404).json({ "error": error.message })
  }
}



module.exports = { getPrevious, getUpcoming, getUserInfo, addingAboutMe, addingSkills };
