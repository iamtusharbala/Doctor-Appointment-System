import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
        // console.log(response.data.appointment)
    }
    return (
        <div>GetAppointments</div>
    )
}

export default GetAppointments