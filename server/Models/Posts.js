// getAll
// getByDate
// getByType
// getByName
// getById
const db = require("../Database/connect");
class Posts {
  constructor({
  projectid,
  activityname,
  activitytype,
  description,
  day,
  date,
    Time,
  	organizationid,
    organizationname
  }) {
    this.id =  projectid;
    (this.name = activityname),
      (this.type = activitytype),
      (this.description = description),
      (this.day = day),
      (this.date = date),
      (this.time = Time),
      (this.organizationid = organizationid),
      (this.organizationname = organizationname);
  }
  

  static async getAll() {
    const response = await db.query(
      "SELECT p.*, o.OrganizationName FROM Project p JOIN Organization o ON p.OrganizationID = o.OrganizationID ORDER BY p.date;"
    );

    if (response.rows.length === 0) {
      throw new Error("No projects found");
    }


    return response.rows.map((row) => new Posts(row));
  }

  static async getByType(type) {
   
    const response = await db.query(
      "SELECT *, o.organizationname FROM project p JOIN organization o ON p.	organizationid = o.	organizationid WHERE p.activitytype LIKE $1",
      [type]
    );
    if (response.rows.length === 0) {
      throw new Error("No activities Found in Database");
    }
    return response.rows.map((row) => new Posts(row));
  }

  static async getByName(name) {
    const response = await db.query(
      "SELECT *, o.organizationname FROM project p JOIN organization o ON p.	organizationid = o.	organizationid WHERE LOWER(p.activityname) = LOWER($1);",
      [name]
    );
    if (response.rows.length === 0) {
      throw new Error("No activities Found in Database");
    }
    return response.rows.map((row) => new Posts(row));
  }

  static async getByDate(date) {
    const response = await db.query(
      "SELECT *, o.organizationname FROM project p JOIN organization o ON p.	organizationid = o.	organizationid WHERE p.Date = $1;",
      [date]
    );
    if (response.rows.length === 0) {
      throw new Error("No activities found in the database for the given date");
    }
    return response.rows.map((row) => new Posts(row));
  }
  static async getById(id) {
    const response = await db.query(
      "SELECT *, o.organizationname FROM project p JOIN organization o ON p.	organizationid = o.	organizationid WHERE p.ProjectID = $1;",
      [id]
    );
    if (response.rows.length === 0) {
      throw new Error("No Project Found With This Id in the Database");
    }
    return response.rows.map((row) => new Posts(row));
  }

}

module.exports = Posts;
