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
        if (!email || !password || !name || !gender || !phoneNumber || !address || !place) {
            res.status(400).json({ message: 'All fields are required' })
        }
        const checkDoctor = await Doctor.findOne({ email })
        if (checkDoctor) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const hashPassword = passwordHasher.createHashPassword(password)
        const newDoctor = new Doctor({
            email, password: hashPassword, name, gender, phoneNumber, address, place
        })
        await newDoctor.save()
        return res.status(201).json({ message: 'New Doctor record created successfully' })
    } catch (error) {
        console.error('Error while registering Doctor', error);
    }
})

module.exports = router