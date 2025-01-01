const { registerUser } = require('../services/user_service.js');
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
    const userId = req.body._id;

    try {
        const UserData = await User.findOne({ _id: userId });
        if (!UserData) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                data: null,
                error: "User not found"
            });
        }

        if (UserData.verified) {
            return res.status(400).json({
                message: "User already verified",
                success: false,
                data: null,
                error: "User already verified"
            });
        }

        const g_otp = Math.floor(1000 + Math.random() * 9000);
        const oldOtpdata = await OTP.findOne({ userId: userId });
        if (oldOtpdata) {
            const sendNextOtp = await oneMinuteExpiry(oldOtpdata.timestamp);
            if (!sendNextOtp) {
                return res.status(400).json({
                    message: "Please Resend OTP After 1 Minute",
                    success: false,
                    data: null,
                    error: "Please Resend OTP After 1 Minute"
                });
            }
        }

        const cDate = Date.now();

        const userEmail = UserData.email;
        const msg = `
            <div style="font-family: Arial, sans-serif; background-color:rgb(238, 250, 245); color: #333; padding: 20px;">
                <h1 style="color:rgb(233, 210, 9);">Hi <i><u><b>${UserData.fullName}</b></u></i></h1>
                <br>
                <h2>OTP for Verification of ${userEmail} is <span style="color: #FF5722;">${g_otp}</span></h2>
                <p style="font-size: 14px; color: #777;">This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
            </div>
        `;

        // Check if OTP already exists for the user
        let enter_otp = await OTP.findOne({ userId: userId });

        if (enter_otp) {
            // Update the existing OTP
            enter_otp.otp = g_otp;
            enter_otp.timestamp = cDate; // Update the timestamp field
            enter_otp.expired = false;
        } else {
            // Create a new OTP
            enter_otp = new OTP({
                userId: userId,
                otp: g_otp,
                timestamp: cDate, // Set the timestamp field
                expired: false
            });
        }

        // Save the OTP document
        const response = await enter_otp.save();

        // Send the OTP email
        await mailer.sendMail({
            from: process.env.EMAIL,
            to: userEmail,
            subject: 'OTP Verification',
            html: msg
        });

        res.status(200).json({
            message: 'OTP sent successfully',
            success: true,
            data: response,
            error: null
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to send OTP',
            success: false,
            data: null,
            error: error.message
        });
    }
}

async function verifyOTP(req, res) {
    try {
        const { _id, otp } = req.body;
        UserData = await User.findOne({ _id: _id})
        if (UserData.verified==true) {
            return res.status(400).json({
                message: "User already verified",
                success: false,
                data: null,
                error: "User already verified"
            });
        }

        const userOtp = await OTP.findOne({ userId: _id });
        if (!userOtp) {
            return res.status(400).json({
                message: 'Please send OTP first',
                success: false,
                data: null,
                error: 'Please send OTP first'
            });
        }

        const otpData = await OTP.findOne({
            userId: _id,
            otp: otp
        });
        if (!otpData) {
            return res.status(400).json({
                message: 'Invalid OTP',
                success: false,
                data: null,
                error: 'Invalid OTP'
            });
        }

        const isOtpExpired = await fiveMinuteExpiry(otpData.timestamp);
        if (isOtpExpired) {
            await OTP.findOneAndUpdate({ userId: _id, otp: otp }, { $set: { expired: true } });
            return res.status(400).json({
                message: 'OTP Expired',
                success: false,
                data: null,
                error: 'OTP Expired'
            });
        }

    const userData =    await User.findOneAndUpdate({ _id: _id, verified: false }, { $set: { verified: true } });

        res.status(200).json({
            message: 'OTP verified successfully',
            success: true,
            data: userData,
            error: null
        });
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