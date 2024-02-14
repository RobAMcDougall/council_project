const db = require("../Database/connect");

class User {
  constructor({ userID, username, password }) {
    this.id = userID;
    this.username = username;
    this.password = password;
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM Volunteer WHERE userID = $1", [
      id,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async getOneByUsername(username) {
    const response = await db.query("SELECT * FROM Volunteer WHERE username = $1", [
      username,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async create(data) {
    const { username, password } = data;
    let response = await db.query(
      "INSERT INTO Volunteer (username, password, role) VALUES ($1, $2, User) RETURNING userID;",
      [username, password]
    );
    const newId = response.rows[0].userID;
    const newUser = await User.getOneById(newId);
    return newUser;
  }
}

module.exports = User;
