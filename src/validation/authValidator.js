const jwt = require("jsonwebtoken") ;
const { JWT_SECRET } = require("../config/serverConfig");
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
    const decoded = jwt.verify(token , JWT_SECRET)

    if (!decoded) {
        return res.status(401).json({
            success : false , 
            data : {} ,
            error : 'NOT AUTHENTICATED' ,
            message : 'INVALID TOKEN PROVDED '
        })
    }

    req.user = {
        email : decoded.email ,
        id : decoded.id
    }

    next();

}


module.exports = {
    isLoggedIn
}