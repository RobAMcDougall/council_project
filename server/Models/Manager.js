const db = require("../Database/connect");
class Managers {
  constructor({ organizationid, description, organizationname }) {
    (this.id = organizationid),
      (this.description = description),
      (this.name = organizationname);
  }
  static async organizationInfo(name) {
    const response = await db.query(
      "SELECT * FROM organization WHERE LOWER(organizationname) = LOWER($1);",
      [name]
    );
    if (response.rows.length != 1) {
      throw new Error("can not get Organization");
    }
    return new Managers(response.rows[0]);
  }
}
class Project {
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
  static async getByName(name) {
    const response = await db.query(
      "SELECT *, o.organizationname FROM project p JOIN organization o ON p.	organizationid = o.	organizationid WHERE LOWER(p.activityname) = LOWER($1);",
      [name]
    );
    if (response.rows.length === 0) {
      throw new Error("No activities Found in Database");
    }
    return response.rows.map((a) => new Project(a));
  }

  static async getByType(type) {
    const response = await db.query(
      "SELECT *, o.organizationname FROM project p JOIN organization o ON p.	organizationid = o.	organizationid WHERE p.activitytype LIKE $1",
      [type]
    );
    if (response.rows.length === 0) {
      throw new Error("No activities Found in Database");
    }
    return response.rows.map((a) => new Project(a));
  }
  static async getByDate(date) {
    const response = await db.query("SELECT *, o.organizationname FROM project p JOIN organization o ON p.	organizationid = o.	organizationid WHERE p.Date = $1;",
    [date]
    );
    if (response.rows.length === 0) {
      throw new Error("No activities found in the database for the given date");
    }
    return response.rows.map((a) => Project(a));
  }
  static async getById(id) {
    const response = await db.query(
      "SELECT *, o.organizationname FROM project p JOIN organization o ON p.	organizationid = o.	organizationid WHERE p.ProjectID = $1;",
      [id]
    );
    if (response.rows.length === 0) {
      throw new Error("No Project Found With This Id in the Database");
    }
    return response.rows.map((a) => new Project(a));
  }
  static async create(data) {
    const {
    activityname,
    activitytype,
    description,
    day,
    date,
      Time,
      organizationid
    } = data;
    const ep = await db.query(
      "SELECT * FROM Project WHERE LOWER(activityname) = LOWER($1);",
      [activityname]
    );
    if (ep.rows.length > 0) {
      throw new Error("Project found in DB");
    }
    let response = await db.query(
      "INSERT INTO Project (activityname, activitytype, description, day, date, Time,  organizationid) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
      [ activityname, activitytype, description, day, date, Time,  organizationid]
    );
    return new Project(response.rows[0]);
  }
  static async update(data) {
    const { activityname, activitytype, description, day, date, Time, projectid } = data;
    let response = await db.query(
      "UPDATE project SET activityname = $1, activitytype = $2, description = $3, day = $4, date = $5, Time = $6 WHERE projectid = $7 RETURNING *;",
      [activityname, activitytype, description, day, date, Time, projectid]
    );
    if (response.rows.length != 1) {
      throw new Error("unable to Update activity");
    }
    return new Project(response.rows[0]);
  }
  static async destroy() {
    let response = await db.query(
      "DELETE FROM project WHERE projectid = $1 RETURNING *",
      [this.id]
    );
    return new Project(response.rows[0]);
  }
}
module.exports = Managers, Project;
