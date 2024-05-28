import React from 'react'
import NavBar from './components/NavBar/NavBar'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/User/HomePage'
import BookAppointment from './pages/User/BookAppointment'
import GetAppointments from './pages/User/GetAppointments'
import UserProfile from './pages/User/UserProfile'

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/book-appointment' element={<BookAppointment />} />
        <Route path='/get-appointment' element={<GetAppointments />} />
        <Route path='/profile' element={<UserProfile />} />
      </Routes>
    </div>
  )
}

export default App