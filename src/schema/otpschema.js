const mongoose = require("mongoose");
const User = require("./userSchema");

const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true
    },
    otp: {
        type: Number,
        required: true
    },
    expired: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Number,
        default: Date.now,
        required: false,
        get: function (timestamp) {
            return timestamp ? timestamp : null;
        },
        set: function (timestamp) {
            return timestamp ? timestamp : null;
        }
    }
});

const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;