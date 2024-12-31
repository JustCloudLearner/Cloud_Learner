const User = require('../schema/userSchema');
const BadRequestError = require('../utils/badRequestError');
const InternalServerError = require('../utils/internalServarError');


    async function findUser(parameters){
        try {
            const response = await User.findOne({...parameters})
            return response
        } catch (error) {
            console.log(error);
        }
      
    }
    async function createUser(userDetails){
        try {
            const response = await User.create(userDetails)
            return response
        } catch (error) {
            if(error.name === 'ValidationError'){
                const errorMessageList =  Object.keys(error.errors).map((property)=> { 
                 return   property , error.errors[property].message
                    
                })  
                console.log(errorMessageList);
                
              throw new BadRequestError(errorMessageList)
             }
             
            console.log(error);
            throw new InternalServerError()
        }
       
    }

  

module.exports = {
    findUser,
    createUser
}