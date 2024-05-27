const mongoose = require('mongoose')
const Schema = mongoose.Schema


const appointmentSchema = new Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',

    }, date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Cancelled', 'Completed'],
        default: 'Scheduled',
        required: true
    }
}, { timestamps: true })

const Appointment = mongoose.model('Appointment', appointmentSchema)
module.exports = Appointment