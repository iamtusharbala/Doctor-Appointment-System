import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Login = () => {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const [patientForm, setPatientForm] = useState(true)
    const [formData, setFormdata] = useState({
        email: '',
        password: ''
    })
    const handleForm = (e) => {
        const { name, value } = e.target
        setFormdata({ ...formData, [name]: value })
    }

    const submitform = async (e) => {
        e.preventDefault()
        try {
            console.log(formData);
            if (patientForm) {
                const response = await axios.post('http://localhost:3000/api/v1/patient/login', formData)
                if (response.data.message === 'User logged in successfully') {
                    const token = response.data.token
                    const userId = response.data.patient._id
                    authContext.login(token, userId)
                    navigate('/')
                }
            }
            else {
                const response = await axios.post('http://localhost:3000/api/v1/doctor/login', formData)
                if (response.data.message === 'Doctor logged in successfully') {
                    console.log(response.data);
                    const token = response.data.token
                    const userId = response.data.doctor._id
                    authContext.login(token, userId)
                    navigate('/doctor-dashboard')
                }
            }
        } catch (error) {
            console.error('error in submitting form', error);
        }
    }

    const checkRadio = (event) => {
        setPatientForm(event.target.id === 'patient');
    };


    return (
        <div className="container">
            <div className="row">
                <div className="form-check mt-5">
                    <input className="form-check-input" type="radio" name="patient" id="patient" onChange={checkRadio} checked={setPatientForm} />
                    <label className="form-check-label" htmlFor="patient">
                        Patient Login
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="doctor" onChange={checkRadio} id="doctor" checked={!setPatientForm} />
                    <label className="form-check-label" htmlFor="doctor">
                        Doctor Login
                    </label>
                </div>
                {patientForm ? (<div className="login mt-5">
                    <h1 className='display-h4 mb-3'>Patient Login</h1>
                    <form onSubmit={submitform}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleForm} value={formData.email} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={handleForm} value={formData.password} />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>)
                    :
                    (<div className="login mt-5">
                        <h1 className='display-h4 mb-3'>Doctor Login</h1>
                        <form onSubmit={submitform}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleForm} value={formData.email} />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={handleForm} value={formData.password} />
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </div>)}
            </div>
        </div>
    )
}

export default Login