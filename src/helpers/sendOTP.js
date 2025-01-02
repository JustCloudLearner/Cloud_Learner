const { sendMail } = require("./nodemailer");

async function sendOTP(emailDetails) {
    try {
        const response = await sendMail({
            from: emailDetails.senderEmail,
            to: emailDetails.recieverEmail,
            subject: emailDetails.subject,
            html: emailDetails.message
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { sendOTP };