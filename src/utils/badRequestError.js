const AppError = require("./appError");

class BadRequestError extends AppError{
    constructor(invalidParams){
        let message = '' 
        invalidParams.forEach(params => message += `${params}\n` );
        super(`THE REQUEST HAS THE FOLLOWING INVALID PARAMETERS : \n${invalidParams}` , 400)
    }
}
module.exports = BadRequestError 