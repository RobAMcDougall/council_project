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
    organizationname,
    userid,
    username,

  }) {
    this.id =  projectid;
    (this.name = activityname),
      (this.type = activitytype),
      (this.description = description),
      (this.day = day),
      (this.date = date),
      (this.time = Time),
      (this.organizationid = organizationid),
      (this.organizationname = organizationname),
      (this.userid = userid),
      (this.username = username);
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
  static async upcomingVolunteering() {
    const response = await db.query(
      "SELECT *, o.organizationname FROM project p JOIN organization o ON p.organizationid = o.organizationid WHERE p.date > CURRENT_DATE ORDER BY p.date DESC LIMIT 2;"
    );
    if (response.rows.length === 0) {
      throw new Error("No upcoming projects found");
    }
  
    return response.rows.map(row => new Posts(row));
}
static async volunteer(data) {
  const {userid, projectid} = data
  console.log(data)
  const ev = await db.query("SELECT * FROM userproject WHERE userid = $1 AND projectid = $2;", [userid, projectid]);

  if (ev.rows.length > 0) {
    throw new Error("Volunteer opportunity exists");
  }

  const response = await db.query(`
    INSERT INTO UserProject (userid, projectid)
    VALUES ($1, $2)
    RETURNING
      (SELECT p.activityname FROM project AS p WHERE p.projectid = $2) AS activityname,
      (SELECT p.activitytype FROM project AS p WHERE p.projectid = $2) AS activitytype,
      (SELECT v.username FROM volunteer AS v JOIN userproject AS up ON v.userid = up.userid WHERE up.projectid = $2) AS username;
  `, [userid, projectid]);
 
  return new Posts(response.rows[0]);
}
}

module.exports = Posts;
