const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/connect')


const patientRoutes = require('./routes/patientRoutes')
const doctorRoutes = require('./routes/doctorRoutes')

const app = express()

//Connect to DB
connectDB()

app.use(express.json())

app.use(cors())
app.use(morgan('dev'))

const PORT = 3000

app.use('/api/v1/patient', patientRoutes)
app.use('/api/v1/doctor', doctorRoutes)

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})