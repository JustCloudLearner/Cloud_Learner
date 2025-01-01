const mongoose = require('mongoose');
const configschema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Emaildata = mongoose.model("Emaildata", configschema);
module.exports = Emaildata;