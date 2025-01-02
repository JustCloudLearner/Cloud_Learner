const { registerUser, sendOTPTOUserService, verifyOTPFromUserService } = require('../services/user_service.js');
const OTP = require('../schema/otpschema.js');
const User = require('../schema/userSchema.js');
const mailer = require('../helpers/nodemailer.js');
const { oneMinuteExpiry, fiveMinuteExpiry } = require('../helpers/otpvalidate.js');

async function createUser(req, res) {
    console.log("User Controller caller\n ", req.body);
    try {
        const response = await registerUser(req.body);
        return res.status(201).json({
            message: "User Created Successfully",
            success: true,
            data: response,
            error: null
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error While Creating User",
            success: false,
            data: null,
            error: error
        });
    }
}

async function sendOTP(req, res) {
    try {
        await sendOTPTOUserService(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error while sending OTP',
            success: false,
            data: null,
            error: error.message
        });
    }
}

async function verifyOTP(req, res) {
    try {
       await verifyOTPFromUserService(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Invalid OTP',
            success: false,
            data: null,
            error: error.message
        });
    }
}

module.exports = {
    createUser,
    sendOTP,
    verifyOTP
};