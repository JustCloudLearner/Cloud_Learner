const jwt = require("jsonwebtoken") ;
const { JWT_SECRET } = require("../config/serverConfig");
const UnAuthorisedError = require("../utils/unauthorisedError");
async function isLoggedIn(req , res , next) {
    const token = req.cookies["authToken"]
    if (!token) {
        return res.status(401).json({
            success : false , 
            data : {} ,
            error : 'NOT AUTHENTICATED' ,
            message : 'NO AUTH TOKEN PROVIDED'
        })
    }
    try {
    const decoded = jwt.verify(token , JWT_SECRET)
    
    console.log("JWT Token Decoded: ", decoded);
    
    if (!decoded) {
        throw new UnAuthorisedError()
    }
    req.user = {
        email: decoded.email ,
        id: decoded.id , 
        role: decoded.role
    }

    next();
        
    } catch (error) {
        if (error.name == "TokenExpiredError") {
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
        return res.status(401).json({
            success : false , 
            data : {} ,
            error : error ,
            message : 'INVALID TOKEN PROVDED '
        })
    }




}

function isAdmin(req , res , next) {
    const loggedInUser = req.user
    console.log(loggedInUser);
    
    if (loggedInUser.role === 'ADMIN') {
        console.log('USER IS AN ADMIN');
        
        next()
    }else { 
        return res.status(401).json({
            success : false ,
            data : {} ,
            message : "YOU ARE NOT AUTHORISED AS AN ADMIN" ,
            error : {
                statusCode : 401 , 
                reason : "UNAUTHORISED USER FOR THIS ACTION"
            }
        })
    }

}

module.exports = {
    isLoggedIn ,
    isAdmin
}