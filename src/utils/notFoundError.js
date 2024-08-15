const AppError = require("./appError");

class NotFoundError extends AppError{
    constructor( resource){

        super(`NOT ABLE TO FIND ${resource}` , 404)
    }
}
module.exports = NotFoundError 