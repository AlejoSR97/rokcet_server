const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    last_connection: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('User', UserSchema);