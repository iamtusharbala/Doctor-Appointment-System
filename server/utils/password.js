const bcrypt = require('bcrypt');

const createHashPassword = (password) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash
    } catch (error) {
        console.error('Error in password hashing');
    }
}


const comparePassword = (password, passwordFromDB) => {
    try {
        const check = bcrypt.compareSync(password, passwordFromDB);
        if (!check) {
            return false
        }
        return true
    } catch (error) {
        console.error('Error in password comparing');
    }
}

module.exports = { createHashPassword, comparePassword }