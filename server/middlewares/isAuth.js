const jwt = require('jsonwebtoken')
require('dotenv').config()


const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        return res.status(400).json({ message: 'No authorization header detected' })
    }
    const token = authHeader.split(" ")[1]
    if (!token || token === "") {
        return res.status(400).json({ message: 'Authorization token error' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decoded
    next()
}

module.exports = isAuth