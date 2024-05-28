import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/User/HomePage'
import BookAppointment from './pages/User/BookAppointment'
import GetAppointments from './pages/User/GetAppointments'
import UserProfile from './pages/User/UserProfile'
import AuthContext from './context/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Doctor/Dashboard'
import AuthRoute from './util/AuthRoute'

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState({
    token: null,
    userId: null
  })

  const login = (token, userId) => {
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      setUserLoggedIn({ token, userId });
    }
  }, []);

  const logout = () => {
    setUserLoggedIn({ token: null, userId: null })
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
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
          <Route path='/' element={<AuthRoute><HomePage /></AuthRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/book-appointment' element={<AuthRoute> {userLoggedIn.userId && <BookAppointment userId={userLoggedIn.userId} />}</AuthRoute>} />
          <Route path='/get-appointment' element={<AuthRoute><GetAppointments /></AuthRoute>} />
          <Route path='/profile' element={<AuthRoute><UserProfile /></AuthRoute>} />
          <Route path='/doctor-dashboard' element={<AuthRoute><Dashboard /></AuthRoute>} />
        </Routes>
      </AuthContext.Provider>
    </div >
  )
}

export default App