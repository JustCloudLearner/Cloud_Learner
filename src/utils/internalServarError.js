const AppError = require("./appError");

class InternalServerError extends AppError{
    constructor(){
        super(`IT'S NOT YOU IT'S OUR SERVER WHERE SOMETHING WENT WRONG` , 500)
    }
} 
module.exports = InternalServerError