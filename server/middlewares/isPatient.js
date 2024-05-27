const Patient = require('../models/patient')


const isPatient = async (req, res, next) => {
    const patientId = req.user._id
    const checkPatient = await Patient.findById(patientId)
    if (checkPatient) {
        return next()
    }
    return res.status(400).json({ message: 'Not a patient' })
}

module.exports = isPatient