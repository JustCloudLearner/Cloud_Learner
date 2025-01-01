const check = require('express-validator').check;

const loginValidator = [    
   check('_id',"Please Enter User Id").not().isEmpty(),
   check('otp',"Please Enter OTP").not().isEmpty()
];

module.exports = loginValidator;