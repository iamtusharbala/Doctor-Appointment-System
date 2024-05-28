const express = require('express')
const router = express.Router()
const Patient = require('../models/patient')
const Doctor = require('../models/doctor')
const Appointment = require('../models/appointment')
const passwordHasher = require('../utils/password')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const isAuth = require('../middlewares/isAuth')
const isPatient = require('../middlewares/isPatient')
const { default: mongoose } = require('mongoose')

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
        const token = jwt.sign({ _id: patient._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        res.setHeader('Authorization', `Bearer ${token}`)
        return res.status(200).json({ message: 'User logged in successfully', patient, token })
    } catch (error) {
        console.error('Error while login patient');
    }
})

router.get('/patient-dashboard', isAuth, isPatient, async (req, res) => {
    console.log(req.user);
    res.send('Protected Routes')
})


router.get('/get-doctors', async (req, res) => {
    try {
        const doctor = await Doctor.find();
        if (!doctor) {
            return res.status(404).json({ error: 'Doctors not found' });
        }

        return res.status(200).json({ message: 'All doctors fetched successfully', doctor })
    } catch (error) {
        console.error('Error while booking appointment', error);
    }
})


router.post('/book-appointment', isAuth, isPatient, async (req, res) => {
    try {
        // console.log(req.user);
        const { patient, doctor, date, time, status } = req.body
        const getPatient = await Patient.findById(patient);
        if (!getPatient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const getDoctor = await Doctor.findById(doctor);
        if (!getDoctor) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        if (!patient || !doctor || !date || !time || !status) {
            res.status(400).json({ message: 'All fields are required' })
        }
        const newAppointment = new Appointment({
            patient, doctor, date, time, status
        })

        await newAppointment.save()
        return res.status(201).json({ message: 'New patient record created successfully', appointment: newAppointment })
    } catch (error) {
        console.error('Error while booking appointment', err);
    }
})


router.get('/get-appointment/:id', isAuth, isPatient, async (req, res) => {
    try {
        const { id } = req.params
        const appointment = await Appointment.find({ patient: id })
            .populate('patient', 'name place email')
            .populate('doctor', 'firstName lastName email department')
            .exec();
        if (!appointment) {
            return res.status(404).json({ error: 'Appointments not found' });
        }
        return res.status(200).json({ message: 'All appoinments fetched successfully', appointment })
    } catch (error) {
        console.error('Error while fetching appointments', error);
    }
})

module.exports = router