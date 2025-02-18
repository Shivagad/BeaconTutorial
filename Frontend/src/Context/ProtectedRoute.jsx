// NonDashboardRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export const NonDashboardRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // If the current user is an admin, force them to the dashboard
  if (currentUser?.role === 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

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