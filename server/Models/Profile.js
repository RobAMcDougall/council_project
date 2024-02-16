// get user info
//     get previous and registered opportunities (join in)
//     get upcoming and registered opportunities (SQL query that will compare the date of existing to the date we are on at the moment)
// date , orgnization
const db = require("../Database/connect");

class Profile {
  constructor({ userid, username, email, aboutme, activityname, skills }) {
    (this.id = userid),
      (this.username = username),
      (this.email = email),
      (this.aboutme = aboutme),
      (this.skills = skills),
      (this.activityname = activityname)
  }
  static async getUserInfo(username) {
    const response = await db.query(
      "SELECT * FROM volunteer WHERE username = $1;",[username]
    );
    if (response.rows.length != 1) {
      throw new Error(" can not find user");
    }
    return new Profile(response.rows[0]);
  }
  static async PreviousVolunteering(username) {
    const response = await db.query(
      "SELECT p.activityname FROM volunteer u JOIN userproject up ON u.userid = up.userid JOIN project p ON up.projectid = p.projectid WHERE u.username = $1 AND p.date < CURRENT_DATE;",
      [username]
    );
    
    if (response.rows.length != 1) {
      throw new Error("Error retrieving past projects");
    }
    return new Profile(response.rows[0]);
  }
  static async upcomingVolunteering(username) {
    const response = await db.query(
      "SELECT p.activityname FROM volunteer u JOIN userproject up ON u.userid = up.userid JOIN project p ON up.projectid = p.projectid WHERE u.username = $1 AND p.date > CURRENT_DATE;",
      [username]
    );
    console.log(response.rows)
    if (response.rows.length < 1) {
      throw new Error("No upcoming projects found for the user.");
    }
    return response.rows.map(row => new Profile(row));
  }
  static async updatingAboutMe(userid, data){
    const {aboutme} =data
    let response = await db.query ("UPDATE volunteer SET aboutme = $1 WHERE userid = $2 RETURNING *;", [aboutme, userid])
    if (response.rows.length != 1) {
      throw new Error("Unable to update About me.")
    }
    return new Profile(response.rows[0]);
  }
  static async updateSkills(id ,data){
    const{ skills } =data
    let response =await db.query("UPDATE volunteer SET skills = $1 WHERE userid = $2 RETURNING *;", [skills, id])
    if (response.rows.length != 1) {
      throw new Error("Unable to update skills.")
    }
    return new Profile(response.rows[0]);
  }
}

module.exports = Profile;
