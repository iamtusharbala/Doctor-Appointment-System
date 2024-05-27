const express = require('express')
const router = express.Router()

const Doctor = require('../models/doctor')
const passwordHasher = require('../utils/password')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const isAuth = require('../middlewares/isAuth')

router.post('/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName, phoneNumber, department } = req.body;
        if (!email || !password || !firstName || !lastName || !phoneNumber || !department) {
            res.status(400).json({ message: 'All fields are required' })
        }
        const checkDoctor = await Doctor.findOne({ email })
        if (checkDoctor) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const hashPassword = passwordHasher.createHashPassword(password)
        const newDoctor = new Doctor({
            email, password: hashPassword, firstName, lastName, phoneNumber, department
        })
        await newDoctor.save()
        return res.status(201).json({ message: 'New Doctor record created successfully' })
    } catch (error) {
        console.error('Error while registering Doctor', error);
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await Doctor.findOne({ email })
        if (!doctor) {
            return res.status(400).json({ message: 'Doctor does not exist, register as new Doctor' })
        }
        const checkPassword = passwordHasher.comparePassword(password, doctor.password)
        if (!checkPassword) {
            return res.status(400).json({ message: 'Incorrect password' })

        }
        const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        res.setHeader('Authorization', `Bearer ${token}`)
        return res.status(200).json({ message: 'Doctor logged in successfully', doctor, token })
    } catch (error) {
        console.error('Error while login Doctor');
    }
})


module.exports = router