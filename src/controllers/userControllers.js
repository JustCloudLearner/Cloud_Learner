const {registerUser} = require("../services/userService")

async function createUser(req ,res) {
    console.log('CREATE USER CONTROLLER CALLED');
    console.log(req.body);

   
   try {
    const response = await registerUser(req.body)

    return res.status(201).json({
        message : 'SUCCESSFULLY REGISTERED THE USER !!' ,
        success : true ,
        data : response ,
        error : {}
    })
   } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
        success : false , 
        message : error.reason ,
        data : {} ,
        error : error
    })
   }
}

module.exports = {
    createUser 
}