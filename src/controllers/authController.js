const { loginUser } = require("../services/authService")

async function logout(req,res) {
    console.log("Cookie From Server:" , req.cookies);
    
    res.cookie('authToken' , '' , {
        httpOnly : true ,
        secure : false ,
        maxAge : 10 * 24 * 60 * 60 * 1000
    })
    return res.status(200).json({
        success: true,
        message: 'SUCCESSFULY LOG OUT',
        error: {},
        data: {}
    })
}

async function login(req , res) {
    try {
        
    const loginPayload = req.body

    const response = await loginUser(loginPayload)

    res.cookie("authToken" , response.token , {
        httpOnly : true ,
        secure : true ,
        maxAge : 10 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
        success : true , 
        message : 'LOGGED IN SUCCESSFULLY' ,
        data : {
            userRole:  response.userRole,
            userData: response.userData
        } ,
        error : {}
    })
    } catch (error) {
        return res.status(error.statusCode).json({
            success : false , 
            data : {} ,
            message : error.message ,
            error : error
        })
    }
}

module.exports = {
    login,
    logout
}