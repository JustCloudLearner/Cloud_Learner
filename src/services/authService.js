const { findUser } = require("../repositories/userRepository");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRY } = require("../config/serverConfig");

 async function loginUser(authDetails) {
    const email = authDetails.email ;
    const plainPassword = authDetails.password ;


    const user = await findUser({email}) ;
// USER CHECK ON SERVER
    if (!user) {
        throw  {message : "NO USER FIND ON SERVER , PLEASE TRY TO SIGN UP FIRST THEN LOGIN" , statusCode : 404}
    }
// PASSWORD CHECK

const isPasswordValidated = await bcrypt.compare(plainPassword , user.password)

// IF PASSWORD INCORRECT 

if (!isPasswordValidated) {
    throw {message : "INVALID PASSWORD , PLEASE TRY AGAIN" , statusCode : 401}
}

// CREATING TOKEN FOR AUTH AFTER PASSWORDD IS VALIDATED

const userRole = user.role ? user.role : "USER"

const token = jwt.sign({email: user.email , id: user._id , role: userRole} , JWT_SECRET , {
    expiresIn: JWT_EXPIRY
})

return {token , userRole , userData:{
    email: user.email ,
    fullName: user.fullName
} }

 }

 module.exports = {
    loginUser
 }