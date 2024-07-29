class  UserService {

    constructor(_userRepository){
        this.userRepository = _userRepository
    }
  async  registerUser(userDetails){
    console.log("HITTING SERVICE LAYER");
        const user = await this.userRepository.findUser({
            email : userDetails.email ,
            mobileNumber : userDetails.mobileNumber
        })
        if (user) {
            throw {reason : "USER WITH GIVEN EMAIL AND PHONE NO. IS ALREADY REGISTERED" , statusCode : 400}
        }
        const newUser = await this.userRepository.createUser({
            email : userDetails.email ,
            mobileNumber : userDetails.mobileNumber , 
            password : userDetails.password ,
            firstName : userDetails.firstName ,
            lastName : userDetails.lastName 
        })
    if(!newUser) {    throw {reason : "SOMETHING WENT WRONG" , statusCode : 500}  }
    return newUser
    }
}

module.exports = UserService