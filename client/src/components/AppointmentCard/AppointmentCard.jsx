import React from 'react'

const AppointmentCard = ({ id, doctor, department, time, date, status, onDelete }) => {
    const deleteAppointment = async () => {
        await onDelete(id);
    }
    return (
        <div>
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">{doctor}</h5>
                    <p className="card-text"><small className="text-body-muted">Department : {department}</small></p>
                    <p className="card-text"><small className="text-body-secondary">Time: {time}</small></p>
                    <p className="card-text"><small className="text-body-secondary">Date: {date}</small></p>
                    <p className="card-text"><small className="text-body-secondary">Status: {status}</small></p>
                    <a href="#" className="btn btn-primary">Edit Appointment</a>
                    <a href="#" className="btn btn-danger" onClick={deleteAppointment}>Delete Appointment</a>
                </div>
            </div>
        </div>
    )
}

export default AppointmentCard