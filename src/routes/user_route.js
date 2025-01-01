const express = require('express');
const { createUser, sendOTP,verifyOTP } = require('../controllers/user_controller');
const otpMailValidator = require('../validation/User/OTPverification.js');
const loginValidator = require('../validation/OTP/otpValidator.js');
const userRouter = express.Router();
userRouter.post('/signup', createUser);
//OTP Verification Route
userRouter.post('/sendotp', otpMailValidator, sendOTP);
userRouter.post('/verify', loginValidator, verifyOTP);
module.exports = userRouter;