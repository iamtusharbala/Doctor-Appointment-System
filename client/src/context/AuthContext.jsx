import React, { createContext } from 'react'

const AuthContext = createContext({
    token: null,
    userId: null,
    login: (token, userId) => { },
    logout: () => { }
})

export default AuthContext