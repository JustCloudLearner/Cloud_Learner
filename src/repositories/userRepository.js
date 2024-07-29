const User = require('../schema/userSchema')

class userRepository {
    async findUsers(parameters){
        try {
            const response = await User.findOne({...parameters})
            return response
        } catch (error) {
            console.log(error);
        }
     
    }
    async createUser(userDetails){
        try {
            const response = await User.create(userDetails)
            return response
        } catch (error) {
            console.log(error);
        }
       
    }
}

module.exports = userRepository