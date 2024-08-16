const AppError = require("./appError");

class UnAuthorisedError extends AppError{
    constructor(){

        super(`USER IS NOT AUTHORISED PROPERLY` , 401)
    }
}
module.exports = UnAuthorisedError 