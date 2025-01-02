const serverconfig = require("../config/serverconfig");
const { sendMail } = require("../helpers/nodemailer");
const { oneMinuteExpiry, fiveMinuteExpiry } = require("../helpers/otpvalidate");
const { findUser, createUser } = require("../repositories/user_repository");
const OTP = require("../schema/otpschema");
const User = require("../schema/userSchema");

async function registerUser(userDetails) {
    console.log("HITTING SERVICE LAYER");
    const user = await findUser({
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber
    });
    if (user) {
        console.log(`EMAIL : ${user.email}\n MOBILE NUMBER : ${user.mobileNumber}`);
        throw { reason: "USER WITH GIVEN EMAIL AND PHONE NO. IS ALREADY REGISTERED", statusCode: 400, email: user.email, mobileNumber: user.mobileNumber };
    }
    const newUser = await createUser({
        email: userDetails.email,
        password: userDetails.password,
        fullName: userDetails.fullName,
    });
    if (!newUser) {
        throw { reason: "SOMETHING WENT WRONG", statusCode: 500 };
    }
    return newUser;
}

async function sendOTPTOUserService(req, res) {
    try {
        // Add logging to debug the request body
        const userId = req.body._id;
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
                success: false,
                data: null,
                error: "User ID is required"
            });
        }

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
                <p style="font-size: 14px; color: #777;">This OTP is valid for 5 minutes. Please do not share it with anyone.<br>If You Have Not Registered Then Contact: justcloudlearners@gmail.com<br>
                *****THIS IS AN AUTOMATED MESSAGE - PLEASE DO NOT REPLY TO THIS EMAIL*****
                </p>
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
         await sendMail({
            from: serverconfig.AUTHEMAIL,
            to: userEmail,
            subject: 'Verification Code',
            html: msg
        });

        return res.status(200).json({
            message: 'OTP sent successfully',
            success: true,
            data: {
                email: userEmail
            },
            error: null
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Failed to send OTP',
            success: false,
            data: null,
            error: e.message
        });
    }
}
async function verifyOTPFromUserService(req, res) {
    try {
        const { _id, otp } = req.body;
     
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

        await User.findOneAndUpdate({ _id: _id, verified: false }, { $set: { verified: true } });

        res.status(200).json({
            message: 'OTP verified successfully',
            success: true,
            data: null,
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
    registerUser,
    sendOTPTOUserService,
    verifyOTPFromUserService
};