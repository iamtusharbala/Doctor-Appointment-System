import React, { useEffect, useState } from 'react'
import axios from 'axios'

const BookAppointment = ({ userId }) => {
    const [departmentList, setDepartmentList] = useState([])
    const [doctorList, setDoctorList] = useState([])
    const [selectedDepartment, setSelectedDepartment] = useState('')
    const [formData, setFormdata] = useState({
        patient: userId,//set this to current user._id
        doctor: '',
        date: '',
        time: '',
        status: 'Scheduled'
    })

    useEffect(() => {
        getDepartment()
    }, [])

    const getDepartment = async () => {
        const response = await axios.get('http://localhost:3000/api/v1/patient/get-doctors');
        setDepartmentList(response.data.doctor);
    }

    const handleDepartmentChange = async (e) => {
        const department = e.target.value
        setSelectedDepartment(department)
        setFormdata(prevState => ({ ...prevState, department }))
        if (department) {
            await getDoctors(department)
        } else {
            setDoctorList([])
        }
    }

    // display doctors only from the selected dept
    const getDoctors = async (department) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/patient/get-doctors`)
            const dataArray = response.data.doctor
            const newArray = dataArray.filter((doctor) => doctor.department === department)
            setDoctorList(newArray)
            console.log(newArray);
        } catch (error) {
            console.error('Error fetching doctors', error);
        }
    }

    const handleForm = (e) => {
        const { name, value } = e.target
        setFormdata({ ...formData, [name]: value })
    }

    const submitform = (e) => {
        e.preventDefault()
        console.log(formData);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="book-appointment mt-5">
                    <h1 className='display-h4 mb-3'>Book Appointment</h1>
                    <form onSubmit={submitform}>
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="department">Department</label>
                            <select className="form-select" id="department" onChange={handleDepartmentChange} value={selectedDepartment}>
                                <option>Choose Department</option>
                                {departmentList && (departmentList.map((department) => <option key={department._id} value={department.department} >{department.department}</option>))}
                            </select>
                        </div>
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="doctor">Doctor</label>
                            <select className="form-select" id="doctor" name="doctor" onChange={handleForm} value={formData.doctor}>
                                <option value=''>Choose Doctor</option>
                                {doctorList && (doctorList.map((doctor) => <option key={doctor._id} value={doctor._id}>{doctor.firstName + " " + doctor.lastName}</option>))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Choose Date</label>
                            <input type="date" name="date" className="form-control" id="date" onChange={handleForm} value={formData.date} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="time" className="form-label">time</label>
                            <input type="time" name="time" onChange={handleForm} className="form-control" id="time" />
                        </div>
                        <button type="submit" className="btn btn-primary">Book Appointment</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BookAppointment