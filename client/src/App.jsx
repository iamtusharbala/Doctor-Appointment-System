import React, { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/User/HomePage'
import BookAppointment from './pages/User/BookAppointment'
import GetAppointments from './pages/User/GetAppointments'
import UserProfile from './pages/User/UserProfile'
import AuthContext from './context/AuthContext'
import Login from './pages/Login'

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState({
    token: null,
    userId: null
  })

  const login = (token, userId) => {
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
  }

  const logout = () => {
    setUserLoggedIn({ token: null, userId: null })
    localStorage.removeItem('token', token)
    localStorage.removeItem('userId', userId)
  }

  return (
    <div>
      <AuthContext.Provider value={{
        token: userLoggedIn.token,
        userId: userLoggedIn.userId,
        login: login,
        logout: logout
      }}>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/book-appointment' element={<BookAppointment />} />
          <Route path='/get-appointment' element={<GetAppointments />} />
          <Route path='/profile' element={<UserProfile />} />
        </Routes>
      </AuthContext.Provider>
    </div >
  )
}

export default App