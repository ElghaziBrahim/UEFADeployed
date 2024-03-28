
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    favourite_team: {
        type: String,
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;