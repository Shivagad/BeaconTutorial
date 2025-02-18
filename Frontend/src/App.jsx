import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './dashboard/Layout';
import TenthResults from './dashboard/dashboardpages/TenthResults';
import TwelthResult from './dashboard/dashboardpages/TwelthResults';
import CETResult from './dashboard/dashboardpages/CETResults';
import JEEResult from './dashboard/dashboardpages/JEEResult';
import NEETResult from './dashboard/dashboardpages/NEETResult';
import Poster from './dashboard/dashboardpages/Poster';
import Results from './Pages/Results';
import Home from './Pages/Home';
import EventGalary from './dashboard/dashboardpages/EventGalary';
import Contact from './Pages/Contact';
import Event from './Pages/Event';
import Admin from './dashboard/dashboardpages/Admin';
import Login from './Pages/Login';
import {NonDashboardRoute,ProtectedRoute} from './Context/ProtectedRoute.jsx'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes: wrapped with NonDashboardRoute */}
        <Route
          path="/event-gallery"
          element={
            <NonDashboardRoute>
              <Event />
            </NonDashboardRoute>
          }
        />
        <Route
          path="/"
          element={
            <NonDashboardRoute>
              <Home />
            </NonDashboardRoute>
          }
        />
        <Route
          path="/login"
          element={
            <NonDashboardRoute>
              <Login />
            </NonDashboardRoute>
          }
        />
        <Route
          path="/all-results"
          element={
            <NonDashboardRoute>
              <Results />
            </NonDashboardRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <NonDashboardRoute>
              <Contact />
            </NonDashboardRoute>
          }
        />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="10th-results"
            element={
              <ProtectedRoute requiredRole="admin">
                <TenthResults />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="event-gallery"
            element={
              <ProtectedRoute requiredRole="admin">
                <EventGalary />
              </ProtectedRoute>
            }
          />
          <Route
            path="12th-results"
            element={
              <ProtectedRoute requiredRole="admin">
                <TwelthResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="poster"
            element={
              <ProtectedRoute requiredRole="admin">
                <Poster />
              </ProtectedRoute>
            }
          />
          <Route
            path="cet-results"
            element={
              <ProtectedRoute requiredRole="admin">
                <CETResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="jee-results"
            element={
              <ProtectedRoute requiredRole="admin">
                <JEEResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="neet-results"
            element={
              <ProtectedRoute requiredRole="admin">
                <NEETResult />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch-all: if none of the above routes match, redirect admins to dashboard, else to login */}
        <Route
          path="*"
          element={
            <NonDashboardRoute>
              <Navigate to="/login" replace />
            </NonDashboardRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
