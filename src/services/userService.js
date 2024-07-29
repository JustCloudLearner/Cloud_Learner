const { findUser, createUser } = require("../repositories/userRepository");

  async  function registerUser(userDetails){
    console.log("HITTING SERVICE LAYER");
        const user = await findUser({
            email : userDetails.email ,
            mobileNumber : userDetails.mobileNumber
        })
        if (user) {
            throw {reason : "USER WITH GIVEN EMAIL AND PHONE NO. IS ALREADY REGISTERED" , statusCode : 400}
        }
        const newUser = await createUser({
            email : userDetails.email ,
            mobileNumber : userDetails.mobileNumber , 
            password : userDetails.password ,
            firstName : userDetails.firstName ,
            lastName : userDetails.lastName 
        })
    if(!newUser) {    throw {reason : "SOMETHING WENT WRONG" , statusCode : 500}  }
    return newUser
    }


module.exports = { 
    registerUser 
}