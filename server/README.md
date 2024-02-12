npm init
npm install express, -D nodemon, bcrypt, cors, dotenv, pg, uuid, supertest, jest, fs

user routes {
    get by name
    get by type 
    get by date
   user main page
}
profile routes{
    get user info
    get previous and registered opportunities (join in) 
    get upcoming and registered opportunities (SQL query that will compare the date of existing to the date we are on at the moment)
}
posts routes{
    get by name
    get by id 
    get by date
    get by type
    get all as a list
}
manager routes{
    get by name
    get by type 
    get by date
    get by id
    post a new activity
    delete by id
    update post

}