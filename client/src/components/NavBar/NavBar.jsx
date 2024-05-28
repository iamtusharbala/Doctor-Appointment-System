import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const NavBar = () => {
    const navigate = useNavigate()
    const authContext = useContext(AuthContext)
    const logout = () => {
        authContext.logout(null, null);
        navigate('/login')
    }
    return (
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <h6 className='nav-link'>Hi User</h6>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/profile'>Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/book-appointment'>Book an Appointment</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/get-appointment'>Get Appointments</Link>
                        </li>
                        <button className='btn btn-primary' onClick={logout}>Logout</button>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar