import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import { NonDashboardRoute, ProtectedRoute } from './Context/ProtectedRoute.jsx';
import MainTestimonial from './Pages/Testimonial';
import About from './Pages/About';
import Scholarships from './Pages/Scholarships';
import AdminScholarship from './dashboard/dashboardpages/Scholarship';
import Inquiry from './Components/Inquiry';
import DashInquiry from './dashboard/dashboardpages/Inquiry.jsx';
import Blog from './Pages/Blog.jsx';
import BlogAdmin from './dashboard/dashboardpages/Blog.jsx';
import Courses from './dashboard/dashboardpages/Courses.jsx';
import AllCourses from './Pages/AllCourses.jsx';
import CourseCards from './dashboard/dashboardpages/coursescard.jsx';
import StudentDetails from './dashboard/StudentManagement/StudentDetails.jsx';
import Studentdash from './Pages/Studentdash.jsx';
import Faculty from './dashboard/dashboardpages/Faculty.jsx';
import Facultymain from './Components/Facultymain.jsx';
import ForgotPassword from './Pages/ForgotPassword.jsx';
import StudentBlog from './Components/Studentblog.jsx';
import OtherExamsResults from './dashboard/dashboardpages/OtherExamResults.jsx'

function AppRoutes() {
  const location = useLocation();
  const protectedPaths = [
    "/dashboard",
    "/dashboard/10th-results",
    "/dashboard/12th-results",
    "/dashboard/cet-results",
    "/dashboard/jee-results",
    "/dashboard/neet-results",
    "/dashboard/courses",
    "/dashboard/coursescard",
    "/dashboard/scholarship",
    "/dashboard/faculty",
    "/dashboard/poster",
    "/dashboard/event-gallery",
    "/dashboard/inquiry",
    "/dashboard/admin",
    "/dashboard/testimonial",
    "/dashboard/blog",
    "/dashboard/cet-student",
    "/dashboard/jee-student",
    "/dashboard/neet-student",
    "/student-dashboard",
    "/forgot-password",
    "/login"
  ];

  const isProtectedRoute = protectedPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <Routes>
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute>
              <Studentdash />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-dashboard/blog"
          element={
            <ProtectedRoute>
              <StudentBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event-gallery"
          element={
            <NonDashboardRoute>
              <Event />
            </NonDashboardRoute>
          }
        />
        <Route
          path="/facultymain"
          element={
            <NonDashboardRoute>
              <Facultymain />
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
          path="/all-courses"
          element={
            <NonDashboardRoute>
              <AllCourses />
            </NonDashboardRoute>
          }
        />
         <Route
          path="/forgot-password"
          element={
            <NonDashboardRoute>
              <ForgotPassword />
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
          path="/student-corner"
          element={
            <NonDashboardRoute>
              <Blog />
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
            path="courses"
            element={
              <ProtectedRoute requiredRole="admin">
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route
          path="otherexams"
          element={
            <ProtectedRoute requiredRole="admin">
            <OtherExamsResults />
          </ProtectedRoute>
          }
          />
          <Route
            path="faculty"
            element={
              <ProtectedRoute requiredRole="admin">
                <Faculty />
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
            path="coursescard"
            element={
              <ProtectedRoute requiredRole="admin">
                <CourseCards />
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
                <BlogAdmin />
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
        
          <Route
            path="all-student/:course"
            element={
              <ProtectedRoute requiredRole="admin">
                <StudentDetails />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch-all Route */}
        <Route
          path="*"
          element={
            <NonDashboardRoute>
              <Navigate to="/login" />
            </NonDashboardRoute>
          }
        />
      </Routes>
      {!isProtectedRoute && <WhatsAppButton />}
    </>
  );
}


const WhatsAppButton = () => (
  <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
    <a
      href="https://wa.me/918767729499"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-500 p-3 rounded-full shadow-lg flex items-center justify-center"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="w-6 h-6"
      />
    </a>
    <a
  href="tel:+918767729499"
  className="bg-blue-500 p-3 rounded-full shadow-lg flex items-center justify-center"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-white"  // <-- Added text-white here
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5h2l3.6 7.59a1 1 0 01-.21 1.11l-2.42 2.42a16 16 0 007.36 7.36l2.42-2.42a1 1 0 011.11-.21L19 19v2a1 1 0 01-1 1C9.94 22 2 14.06 2 4a1 1 0 011-1h2a1 1 0 011 1z"
    />
  </svg>
</a>

  </div>
);


function AppWrapper() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default AppWrapper;
