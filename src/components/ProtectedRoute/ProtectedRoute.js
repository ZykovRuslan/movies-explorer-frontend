import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element: Component, ...props }) {
  const isLoggedIn = localStorage.getItem('JWT') !== null;
  return <>{isLoggedIn ? <Component {...props} /> : <Navigate to='/' replace />}</>;
}

export default ProtectedRoute;
