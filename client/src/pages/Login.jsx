import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Login = () => {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
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
            const response = await axios.post('http://localhost:3000/api/v1/patient/login', formData)
            if (response.data.message === 'User logged in successfully') {
                // console.log(response.data);
                const token = response.data.token
                const userId = response.data.patient._id
                authContext.login(token, userId)
                navigate('/')
            }
        } catch (error) {
            console.error('error in submitting form', error);
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div class="form-check mt-5">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                    <label class="form-check-label" for="flexRadioDefault1">
                        Patient Login
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                    <label class="form-check-label" for="flexRadioDefault2">
                        Doctor Login
                    </label>
                </div>
                <div className="login mt-5">
                    <h1 className='display-h4 mb-3'>Login</h1>
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
                </div>
            </div>
        </div>
    )
}

export default Login