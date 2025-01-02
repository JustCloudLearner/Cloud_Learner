const User = require('../schema/userSchema.js')
const mailer = require('../helpers/nodemailer.js');
const { sendOTP } = require('../helpers/sendOTP.js');
const OTP = require('../schema/otpschema.js');


async function findUser(parameters){
    try {
        const response = await User.findOne({...parameters})
        return response
    } catch (error) {
        console.log(error);
    }
  
}
async function findUserById(userdetails) {
   try {
    const server_response = User.find(userdetails)
    return server_response
   }
    catch (e) {
        console.log(e)
    }
   
} 
async function createUser(userdetails) {
    console.log("User reposatory called \n",userdetails);
    
    try {
        const server_response = User.create(userdetails)
        return server_response
    }
    catch (e) {
        console.log(e)
    }
} 
async function sendOTPForVerificationRepo (userdetails) {
    try {
        const server_response = await sendOTP(userdetails)
        return server_response
    }
    catch (e) {
        console.log(e)
        console.log("Error while sending OTP")
    }
} 

module.exports = {
    findUserById,
    createUser, 
    findUser,
    sendOTPForVerificationRepo,
  
}