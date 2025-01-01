const { findUser, createUser } = require("../repositories/user_repository");

  async  function registerUser(userDetails){
    console.log("HITTING SERVICE LAYER");
        const user = await findUser({
            email : userDetails.email ,
            mobileNumber : userDetails.mobileNumber
        })
        if (user) {
            console.log(`EMAIL : ${user.email}\n MOBILE NUMBER : ${user.mobileNumber}`);
            throw {reason : "USER WITH GIVEN EMAIL AND PHONE NO. IS ALREADY REGISTERED" , statusCode : 400 , email : user.email , mobileNumber : user.mobileNumber}
        }
        const newUser = await createUser({
            email : userDetails.email , 
            password : userDetails.password ,
            fullName : userDetails.fullName ,
            
        })
    if(!newUser) 
        {
          throw {reason : "SOMETHING WENT WRONG" , statusCode : 500} 
         }

       
         return newUser
    }
   


module.exports = { 
    registerUser 
}