const userRepository = require('../repositories/userRepository');
const UserService = require('../services/userService');

async function createUser(req ,res) {
    console.log('CREATE USER CONTROLLER CALLED');
    console.log(req.body);

    const userService = new UserService(new userRepository)
    console.log(userService);
    console.log(userRepository);
   try {
    const response = await userService.registerUser(req.body)

    return res.json({
        message : 'SUCCESSFULLY REGISTERED THE USER !!' ,
        success : true ,
        data : response ,
        error : {}
    })
   } catch (error) {
    console.log(error);
    return res.json({
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