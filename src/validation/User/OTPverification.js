const { check } = require('express-validator');

const otpMailValidator = [
    check('email', 'Please Use Valid Email').isEmail().normalizeEmail({
        gmail_remove_dots: true,
    }),
];

module.exports = otpMailValidator;