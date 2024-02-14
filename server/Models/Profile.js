// get user info
//     get previous and registered opportunities (join in)
//     get upcoming and registered opportunities (SQL query that will compare the date of existing to the date we are on at the moment)
// date , orgnization
const db = require("../Database/connect");

class Profile {
  constructor({ userid, username, email, aboutme, activityname }) {
    (this.id = userid),
      (this.username = username),
      (this.email = email),
      (this.aboutme = aboutme),
      (this.activityname = activityname)
  }
  static async getUserInfo(username) {
    console.log(username)
    const response = await db.query(
      "SELECT * FROM volunteer WHERE username = $1;",[username]
    );
    console.log(response)
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
    if (response.rows.length != 1) {
      throw new Error("Error retrieving upcoming projects");
    }
    return new Profile(response.rows[0]);
  }
}

module.exports = Profile;
