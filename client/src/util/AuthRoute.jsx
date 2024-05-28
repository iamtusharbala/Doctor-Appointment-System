import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const AuthRoute = () => {
  const location = useLocation()
  const token = localStorage.getItem('token');
  // console.log(token);
  if (!token || token === '') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}

export default AuthRoute