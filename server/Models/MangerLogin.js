const db = require('../Database/connect');

class Manager {

    constructor({ OrganisationId, username, password }) {
        this.id = OrganisationId;
        this.username = username;
        this.password = password;
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM Organisation WHERE OrganisationId = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM Organisation WHERE username = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async create(data) {
        const { username, password } = data;
        let response = await db.query("INSERT INTO Organisation (username, password, role) VALUES ($1, $2, Manager) RETURNING OrganisationId;",
            [username, password]);
        const newId = response.rows[0].OrganisationId;
        const newUser = await User.getOneById(newId);
        return newUser;
    }
}

module.exports = Manager;