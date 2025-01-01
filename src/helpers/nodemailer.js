const nodemailer = require('nodemailer');
const serverconfig = require('../config/serverconfig.js'); // Adjust the path as needed

const createTransporter = async () => {
    const email = serverconfig.AUTHEMAIL;
    const password = serverconfig.AUTHPASS;
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass: password
        }
    });
};

const sendMail = async (options) => {
    try {
        const transporter = await createTransporter();
        return new Promise((resolve, reject) => {
            transporter.sendMail(options, (error, info) => {
                if (error) {
                    return reject(error);
                }
                resolve(info);
            });
        });
    } catch (error) {
        throw new Error(`Failed to send email: ${error.message}`);
    }
};

module.exports = { sendMail };