// get user info
//     get previous and registered opportunities (join in)
//     get upcoming and registered opportunities (SQL query that will compare the date of existing to the date we are on at the moment)

const db = require("../Database/connect");

class Profile {
  constructor({ UserID, Username, Password, Email, AboutMe }) {
    (this.id = UserID),
      (this.username = Username),
      (this.email = Email),
      (this.aboutMe = AboutMe);
  }
  static async getUserInfo(username) {
    const response = await db.query(
      "SELECT * FROM User WHERE LOWER(Username) = LOWER($1);"[username]
    );
    if (response.rows.length != 1) {
      throw new Error(" can not find user");
    }
    return new Profile(response.rows[0]);
  }
  static async PreviousVolunteering(username) {
    const response = await db.query(
      `SELECT p."ActivityName"
                FROM "User" u
                JOIN "UserProject" up ON u."UserID" = up."UserID"
                JOIN "Project" p ON up."ProjectID" = p."ProjectID"
                WHERE u."Username" = $1
                AND p."Date" < CURRENT_DATE;`,
      [username]
    );

    if (response.rows.length != 1) {
      throw new Error("Error retrieving past projects");
    }
    return new Profile(response.rows[0]);
  }
  static async upcomingVolunteering(username) {
    const response = await db.query(
      `SELECT p."ActivityName"
            FROM "User" u
            JOIN "UserProject" up ON u."UserID" = up."UserID"
            JOIN "Project" p ON up."ProjectID" = p."ProjectID"
            WHERE u."Username" = $1
            AND p."Date" > CURRENT_DATE;`,
      [username]
    );
    if (response.rows.length != 1) {
      throw new Error("Error retrieving upcoming projects");
    }
    return new Profile(response.rows[0]);
  }
}

module.exports = Profile;
