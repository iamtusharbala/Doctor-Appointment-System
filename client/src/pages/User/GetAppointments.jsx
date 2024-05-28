import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AppointmentCard from '../../components/AppointmentCard/AppointmentCard'

const GetAppointments = ({ userId, token }) => {
    // /get-appointment/:id'
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        getAppointments()
    }, [])

    const getAppointments = async () => {
        // console.log(token);
        const response = await axios.get(`http://localhost:3000/api/v1/patient/get-appointment/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setAppointments(response.data.appointment)
        console.log(response.data.appointment)
        // console.log(response.data.appointment)
        // appointments.map((appt)=>app)
    }
    return (
        <div className='container mt-5'>
            {appointments && appointments.map((appt) => <AppointmentCard key={appt._id} doctor={appt.doctor.firstName + " " + appt.doctor.lastName} department={appt.doctor.department} time={appt.time} date={appt.date} status={appt.status} />)}
        </div>
    )
}

export default GetAppointments