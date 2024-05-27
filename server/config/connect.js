const mongoose = require('mongoose')


const connectDB = () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/hospital-booking')
            .then(() => console.log('Connected to DB successfully..'))
            .catch((e) => console.error(e))
    } catch (error) {
        console.error('Error connecting to DB....', error);
    }
}


module.exports = connectDB