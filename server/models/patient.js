const mongoose = require('mongoose')
const Schema = mongoose.Schema


const patientSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true
    }, place: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

const Patient = mongoose.model('Patient', patientSchema)
module.exports = Patient