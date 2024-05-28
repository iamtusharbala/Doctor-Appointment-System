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
        const response = await axios.get(`http://localhost:3000/api/v1/patient/get-appointment/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setAppointments(response.data.appointment)
        console.log(response.data.appointment)
    }

    const deleteAppointment = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/v1/patient/delete-appointment/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.message === 'Appointment deleted successfully') {
                setAppointments(appointments.filter(appointment => appointment._id !== id));
            }
        } catch (error) {
            console.error('Error deleting appointment', error);
        }
    }


    return (
        <div className='container mt-5'>
            {appointments && appointments.map((appointment) => <AppointmentCard key={appointment._id} id={appointment._id} doctor={appointment.doctor.firstName + " " + appointment.doctor.lastName} department={appointment.doctor.department} time={appointment.time} date={appointment.date} status={appointment.status} onDelete={deleteAppointment} />)}
        </div>
    )
}

export default GetAppointments