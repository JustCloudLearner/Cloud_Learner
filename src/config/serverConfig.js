const dotenv = require('dotenv')
dotenv.config()
// GETTING DATA FROM .ENV FILE 
module.exports = {
    PORT : process.env.PORT,
    DB_URL : process.env.DB_URL
}