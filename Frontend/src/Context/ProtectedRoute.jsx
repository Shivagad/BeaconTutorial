import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export const NonDashboardRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // If the user is an admin, redirect to the admin dashboard
  if (currentUser?.role === 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // If the user is logged in but NOT an admin, send them to the student dashboard
  if (currentUser) {
    return <Navigate to="/student-dashboard/basic-info" replace />;
  }

  // If the user is NOT logged in, allow them to stay
  return children;
};


export const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser } = useAuth();

  // Check if the user is logged in and if their role matches the required role (e.g., 'admin')
  if (!currentUser || currentUser.role !== requiredRole) {
    return <Navigate to="/" />;  // Redirect to home page if not authorized
  }

  return children;  // Render the children (the route component) if authorized
};