const { loginUser } = require("../services/authService")

async function login(req , res) {
    try {
        
    const loginPayload = req.body

    const response = await loginUser(loginPayload)

    res.cookie("authToken" , response , {
        httpOnly : true ,
        secure : false ,
        maxAge : 10 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
        success : true , 
        message : 'LOGGED IN SUCCESSFULLY' ,
        data : {} ,
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
    login
}