const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    updated: { 
        type: Date, 
        default: Date.now }
},{ Timestamp: true})

module.exports = model('user', userSchema);