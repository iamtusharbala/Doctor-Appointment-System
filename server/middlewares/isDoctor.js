const Doctor = require('../models/doctor')


const isDoctor = async (req, res, next) => {
    const doctorId = req.user._id
    const checkDoctor = await Doctor.findById(doctorId)
    if (checkDoctor) {
        return next()
    }
    return res.status(400).json({ message: 'Not a Doctor' })
}

module.exports = isDoctor