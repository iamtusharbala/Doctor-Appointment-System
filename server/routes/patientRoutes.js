const express = require('express')
const router = express.Router()
const Patient = require('../models/patient')
const passwordHasher = require('../utils/password')

router.post('/register', async (req, res) => {
    try {
        const { email, password, name, gender, phoneNumber, address, place } = req.body
        if (!email || !password || !name || !gender || !phoneNumber || !address || !place) {
            res.status(400).json({ message: 'All fields are required' })
        }
        const checkPatient = await Patient.findOne({ email })
        if (checkPatient) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const hashPassword = passwordHasher.createHashPassword(password)
        const newPatient = new Patient({
            email, password: hashPassword, name, gender, phoneNumber, address, place
        })
        await newPatient.save()
        return res.status(201).json({ message: 'New patient record created successfully' })
    } catch (error) {
        console.error('Error while registering patient', error);
    }
})


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const patient = await Patient.findOne({ email })
        if (!patient) {
            return res.status(400).json({ message: 'User does not exist, register as new user' })
        }
        const checkPassword = passwordHasher.comparePassword(password, patient.password)
        if (!checkPassword) {
            return res.status(400).json({ message: 'Incorrect password' })

        }
        return res.status(200).json({ message: 'User logged in successfully' })
    } catch (error) {
        console.error('Error while login patient');
    }
})
module.exports = router