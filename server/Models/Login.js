const db = require("../Database/connect");

class User {
  constructor({ userid, username, password }) {
    this.id = userid;
    this.username = username;
    this.password = password;
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM Volunteer WHERE userid = $1", [
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
    const { username, email, password } = data;
    let response = await db.query(
      "INSERT INTO Volunteer (username, email, password, role) VALUES ($1, $2, $3, 'Volunteer') RETURNING userid;",
      [username, email, password]
    );
    const newId = response.rows[0].userid;
    const newUser = await User.getOneById(newId);
    return newUser;
  }
}

module.exports = User;
