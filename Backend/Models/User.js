const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const multer = require('multer');

const userSchema = new Schema({
    username: {
        type: String, required: true
    },

    email: {
        type: String, required: true
    },

    password: {
        type: String, required: true
    },

    profilePicture: {
        type: String
    }
});

const User = mongoose.model('User',userSchema);
module.exports = User;