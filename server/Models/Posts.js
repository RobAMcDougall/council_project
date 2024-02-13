// getAll
// getByDate
// getByType
// getByName
// getById
const db = require("../Database/connect");
class Posts {
  constructor({
    ProjectID,
    ActivityName,
    ActivityType,
    Description,
    Day,
    Date,
    Time,
    OrganisationID,
  }) {
    this.id = ProjectID;
    (this.name = ActivityName),
      (this.type = ActivityType),
      (this.Description = Description),
      (this.Day = Day),
      (this.Date = Date),
      (this.time = Time),
      (this.OrganisationID = OrganisationID);
  }
  //     SELECT p.*, o."OrganisationName"
  // FROM "Project" p
  // JOIN "Organisation" o ON p."OrganisationID" = o."OrganisationID"
  // ORDER BY p."Date";

  static async getAll() {
    const response = await db.query(
      'SELECT p.*, o."OrganisationName" FROM "Project" p JOIN "Organisation" o ON p."OrganisationID" = o."OrganisationID" ORDER BY p."Date";'
    );

    if (response.rows.length === 0) {
      throw new Error("No projects found");
    }

    return response.rows.map((row) => new Posts(row));
  }

  static async getByDate(date) {
    const response = await db.query(
      'SELECT p.*, o."OrganisationName" FROM "Project" p JOIN "Organisation" o ON p."OrganisationID" = o."OrganisationID" WHERE p."Date" = $1;',
      [date]
    );
    if (response.rows.length === 0) {
      throw new Error("No activities found in the database for the given date");
    }
    return response.rows.map((row) => new Project(row));
  }

  static async getByType(at) {
    const response = await db.query(
      'SELECT p.*, o."OrganisationName" FROM "Project" p JOIN "Organisation" o ON p."OrganisationID" = o."OrganisationID" WHERE LOWER(p."ActivityType") = LOWER($1);',
      [at]
    );
    if (response.rows.length === 0) {
      throw new Error("No activities Found in Database");
    }
    return response.rows.map((row) => new Project(row));
  }

  static async getByName(an) {
    const response = await db.query(
      'SELECT p.*, o."OrganisationName" FROM "Project" p JOIN "Organisation" o ON p."OrganisationID" = o."OrganisationID" WHERE LOWER(p."ActivityName") = LOWER($1);',
      [an]
    );
    if (response.rows.length === 0) {
      throw new Error("No activities Found in Database");
    }
    return response.rows.map((row) => new Project(row));
  }

  static async getById(id) {
    const response = await db.query(
      'SELECT p.*, o."OrganisationName" FROM "Project" p JOIN "Organisation" o ON p."OrganisationID" = o."OrganisationID" WHERE p."ProjectID" = $1;',
      [id]
    );
    if (response.rows.length === 0) {
      throw new Error("No Project Found With This Id in the Database");
    }
    return response.rows.map((row) => new Project(row));
  }
}

module.exports = Posts;
