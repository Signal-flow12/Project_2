const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter a valid email address"],
        unique: [true, "This email is already registered"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    },
    username: {
        type: String,
        required: [true, "Please enter a valid username"],
        unique: [true, "User name is taken"]
    }
}, {timestamps: true});

const User = mongoose.model('user', userSchema)

module.exports = User;