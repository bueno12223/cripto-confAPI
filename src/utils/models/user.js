const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    plan: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    updated: { 
        type: Date, 
        default: Date.now }
},{ Timestamp: true})

module.exports = model('user', userSchema);