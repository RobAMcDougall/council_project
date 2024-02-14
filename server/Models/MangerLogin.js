const db = require("../Database/connect");

class Manager {
  constructor({ OrganizationId, username, password }) {
    this.id = OrganizationId;
    this.username = username;
    this.password = password;
  }

  static async getOneById(id) {
    const response = await db.query(
      "SELECT * FROM Organization WHERE OrganizationId = $1",
      [id]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async getOneByUsername(username) {
    const response = await db.query(
      "SELECT * FROM Organization WHERE username = $1",
      [username]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async create(data) {
    const { username, password } = data;
    let response = await db.query(
      "INSERT INTO Organization (username, password, role) VALUES ($1, $2, Manager) RETURNING OrganizationId;",
      [username, password]
    );
    const newId = response.rows[0].OrganizationId;
    const newUser = await User.getOneById(newId);
    return newUser;
  }
}

module.exports = Manager;
