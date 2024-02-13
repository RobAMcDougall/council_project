// get by name
// get by type 
// get by date
// get by id
// post a new activity
// delete by id
// update post
const db = require("../Database/connect")
class Managers{
    constructor({ProjectID, ActivityName, ActivityType, Description, Day, Date, Time, OrganisationID }){
        this.id = ProjectID;
        this.name = ActivityName,
        this.type = ActivityType,
        this.Description = Description,
        this.Day = Day,
        this.Date = Date,
        this.time = Time,
        this.OrganisationID = OrganisationID
    }
    static async getByName(an){
        const response = await db.query("SELECT * FROM Project WHERE LOWER(ActivityName) = LOWER($1);",[an])
        if(response.rows.length === 0){
            throw new Error("No activities Found in Database")
        }
        return response.rows.map(a => new Managers(a))
    }

    static async getByType(at){
        const response = await db.query("SELECT * FROM Project WHERE LOWER(ActivityType) = LOWER($1);",[at])
        if(response.rows.length === 0){
            throw new Error("No activities Found in Database")
        }
        return response.rows.map(a => new Managers(a))
    }
    static async getByDate(date){
        const response = await db.query("SELECT * FROM Project WHERE Date = $1;", [date]);
        if (response.rows.length === 0) {
            throw new Error("No activities found in the database for the given date");
        }
        return response.rows.map(a => new Managers(a));   
    }
    static async getById(id){
        const response = await db.query("SELECT * FROM Project WHERE ProjectID = $1;", [id])
        if (response.rows.length === 0){
            throw new Error("No Project Found With This Id in the Database")
        }
        return response.rows.map(a => new Managers(a));   
    }
    static async create(data){
        const { ActivityName, ActivityType, Description, Day, Date, Time, OrganisationID } = data;
        const ep = await db.query("SELECT * FROM Project WHERE LOWER(ActivityName) = LOWER($1);",[ActivityName])
        if(es.rows.length > 0 ){
            throw new Error("Project found in DB")
          }
          let response = await db.query('INSERT INTO Project (ActivityName, ActivityType, Description, Day, Date, Time, OrganisationID) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;', [ActivityName, ActivityType, Description, Day, Date, Time, OrganisationID])
          return new Managers(response.rows[0])

    }
    static async update(){

    }
    static async destroy(){

    }
}
module.exports = Managers;