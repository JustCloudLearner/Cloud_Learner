const dotenv = require('dotenv')
dotenv.config()
// GETTING DATA FROM .ENV FILE 
module.exports = {
    PORT : process.env.PORT,
    DB_URL : process.env.DB_URL,
    JWT_SECRET : process.env.JWT_SECRET ,
    JWT_EXPIRY : process.env.JWT_EXPIRY,
    AUTHEMAIL: process.env.AUTHEMAIL,
    AUTHPASS: process.env.AUTHPASS
}