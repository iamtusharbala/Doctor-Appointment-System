const express = require('express')
const router = express.Router()
const Patient = require('../models/patient')
const passwordHasher = require('../utils/password')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const isAuth = require('../middlewares/isAuth')

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
        const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        res.setHeader('Authorization', `Bearer ${token}`)
        return res.status(200).json({ message: 'User logged in successfully', patient, token })
    } catch (error) {
        console.error('Error while login patient');
    }
})

router.get('/test', isAuth, async (req, res) => {
    res.send('Protected Routes')
})

module.exports = router