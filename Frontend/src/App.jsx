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
import EventGallery from './dashboard/dashboardpages/EventGallery';
import Contact from './Pages/Contact';
import Event from './Pages/Event';
import Admin from './dashboard/dashboardpages/Admin';
import Testimonial from './dashboard/dashboardpages/Testimonial';
import Login from './Pages/Login';
import { NonDashboardRoute, ProtectedRoute } from './Context/ProtectedRoute.jsx'
import MainTestimonial from './Pages/Testimonial'
import About from './Pages/About'
import Scholarships from './Pages/Scholarships'
import AdminScholarship from './dashboard/dashboardpages/Scholarship';
import Inquiry from './Components/Inquiry'
import DashInquiry from './dashboard/dashboardpages/Inquiry.jsx'
import Blog from './dashboard/dashboardpages/Blog.jsx';
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
          path="/inquiry"
          element={
            <NonDashboardRoute>
              <Inquiry />
            </NonDashboardRoute>
          }
        />
        <Route
          path="/scholarship"
          element={
            <NonDashboardRoute>
              <Scholarships />
            </NonDashboardRoute>
          }
        />
        <Route
          path="/testimonial"
          element={
            <NonDashboardRoute>
              <MainTestimonial />
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
          path="/about"
          element={
            <NonDashboardRoute>
              <About />
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
            path="inquiry"
            element={
              <ProtectedRoute requiredRole="admin">
                <DashInquiry />
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
                <EventGallery />
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
            path="testimonial"
            element={
              <ProtectedRoute requiredRole="admin">
                <Testimonial />
              </ProtectedRoute>
            }
          />
          <Route
            path="scholarship"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminScholarship />
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
            path="blog"
            element={
              <ProtectedRoute requiredRole="admin">
                <Blog />
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
              <Navigate to="/login" />
            </NonDashboardRoute>
          }
        />
        {/* <Route path="/event-gallery" element={<Event/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/scholarship" element={<Scholarships/>} />
        <Route path="/about" element={<About />} />
         <Route path="/testimonial" element={<MainTestimonial />} />
        <Route path="/all-results" element={<Results/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="10th-results" element={<TenthResults />} />
          <Route path="admin" element={<Admin />} />
          <Route path="testimonial" element={<Testimonial />} />
          <Route path="event-galary" element={<EventGalary/>} />
          <Route path="12th-results" element={<TwelthResult/>} />
          <Route path="poster" element={<Poster/>} />
          <Route path="cet-results" element={<CETResult/>}/>
          <Route path="jee-results" element={<JEEResult/>}/>
          <Route path="scholarship" element={<AdminScholarship/>}/>
          <Route path="neet-results" element={<NEETResult/>}/>
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
