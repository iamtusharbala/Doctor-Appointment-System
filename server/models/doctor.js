const mongoose = require('mongoose')
const Schema = mongoose.Schema

const doctorSchema = new Schema({
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
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        trim: true,
    },
    department: {
        type: String,
        required: true,
        enum: ['Emergency Medicine', 'Internal Medicine', 'Pediatrics', 'Obstetrics and Gynecology (OB/GYN)', 'Surgery', 'Cardiology', 'Oncology', 'Neurology', 'Psychiatry', 'Radiology', 'Anesthesiology', 'Infectious Diseases', 'Hematology'],
        trim: true,
    }
}, { timestamps: true })

const Doctor = mongoose.model('Doctor', doctorSchema)
module.exports = Doctor