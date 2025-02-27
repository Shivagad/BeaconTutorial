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
import Blog from './Pages/Blog.jsx';
import BlogAdmin from './dashboard/dashboardpages/Blog.jsx';
// import ManageStudent from './dashboard/dashboardpages/ManageStudent.jsx';
import Courses from './dashboard/dashboardpages/Courses.jsx'
import AllCourses from './Pages/AllCourses.jsx'
import CourseCards from './dashboard/dashboardpages/coursescard.jsx';
import CET from './dashboard/StudentManagement/CET11.jsx';
import JEE from './dashboard/StudentManagement/JEE11.jsx';
import NEET from './dashboard/StudentManagement/NEET11.jsx';
import Studentdash from './Pages/Studentdash.jsx';
import Faculty from './dashboard/dashboardpages/Faculty.jsx';
import Facultymain from './Components/Facultymain.jsx';
function App() {
  return (
    <BrowserRouter>
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
           {/* <Route
            path="managestudent"
            element={
              <ProtectedRoute requiredRole="admin">
                <ManageStudent />
              </ProtectedRoute>
            }
          /> */}
            <Route
            path="cet-student"
            element={
              <ProtectedRoute requiredRole="admin">
                <CET />
              </ProtectedRoute>
            }
          />
           <Route
            path="neet-student"
            element={
              <ProtectedRoute requiredRole="admin">
                <NEET />
              </ProtectedRoute>
            }
          />

           <Route
            path="jee-student"
            element={
              <ProtectedRoute requiredRole="admin">
                <JEE />
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
