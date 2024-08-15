const mongoose = require('mongoose')
const serverConfig = require('./serverconfig')
async function connectDB() {
    try {
       await mongoose.connect(serverConfig.DB_URL)
      
       console.log("SUCCESSFULLY CONNECTED TO DATABASE SERVER");
    } catch (error) {
        console.log("SOME ERROR OCCURED WHILE CONNECTING TO DATABASE SERVER");
        console.log(error);
    }
}
module.exports = connectDB