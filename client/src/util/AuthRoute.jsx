import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const location = useLocation()
  const token = localStorage.getItem('token');
  // console.log(token);
  if (!token || token === '') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children
}

export default AuthRoute