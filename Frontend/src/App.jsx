import React from "react";
import { useState } from "react";
// import { MessageCircle } from "lucide-react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import DashboardLayout from "./dashboard/Layout";
import TenthResults from "./dashboard/dashboardpages/TenthResults";
import TwelthResult from "./dashboard/dashboardpages/TwelthResults";
import CETResult from "./dashboard/dashboardpages/CETResults";
import JEEResult from "./dashboard/dashboardpages/JEEResult";
import NEETResult from "./dashboard/dashboardpages/NEETResult";
import Poster from "./dashboard/dashboardpages/Poster";
import Results from "./Pages/Results";
import Home from "./Pages/Home";
import EventGallery from "./dashboard/dashboardpages/EventGallery";
import Contact from "./Pages/Contact";
import Event from "./Pages/Event";
import Admin from "./dashboard/dashboardpages/Admin";
import Testimonial from "./dashboard/dashboardpages/Testimonial";
import Login from "./Pages/Login";
import {
  NonDashboardRoute,
  ProtectedRoute,
} from "./Context/ProtectedRoute.jsx";
import MainTestimonial from "./Pages/Testimonial";
import About from "./Pages/About";
import FloatingDropdown from "./Components/FloatingDropDown.jsx";
import Scholarships from "./Pages/Scholarships";
import AdminScholarship from "./dashboard/dashboardpages/Scholarship";
import Inquiry from "./Components/Inquiry";
import DashInquiry from "./dashboard/dashboardpages/Inquiry.jsx";
import Blog from "./Pages/Blog.jsx";
import BlogAdmin from "./dashboard/dashboardpages/Blog.jsx";
import Courses from "./dashboard/dashboardpages/Courses.jsx";
import AllCourses from "./Pages/AllCourses.jsx";
import CourseCards from "./dashboard/dashboardpages/coursescard.jsx";
import StudentDetails from "./dashboard/StudentManagement/StudentDetails.jsx";
import Studentdash from "./Pages/Studentdash.jsx";
import Faculty from "./dashboard/dashboardpages/Faculty.jsx";
import Facultymain from "./Components/Facultymain.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import OtherExamsResults from "./dashboard/dashboardpages/OtherExamResults.jsx";
import StudentBlog from "./Components/Studentblog.jsx";
import BlogDetailPage from "./Components/BlogComponent/BlogDetailPage.jsx";
import StudentDashBoard from "./StudentDashBoard/StudentDashComponents/StudentDashBoard.jsx";
import StudentDashSidebar from "./StudentDashBoard/StudentDashComponents/StudentDashSidebar.jsx";
import BasicInfo from "./StudentDashBoard/DashBoardPages/BasicInfo.jsx";
import StudentResults from "./StudentDashBoard/DashBoardPages/StudentResults.jsx";
import Stat from "./dashboard/dashboardpages/Stat.jsx";
import Batches from "./dashboard/dashboardpages/Batches.jsx";
import phone from "../public/images/phone.png";
import Developers from "./Components/Developers.jsx";
import ChatbotModal from "./Components/Chatbotmodal.jsx";
import { MessageCircle } from "react-feather";
function AppRoutes() {
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
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
    "/dashboard/stat",
    "/dashboard/batches",
    "/dashboard/neet-student",
    "/student-dashboard",
    "/forgot-password",
    "/login",
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
              <StudentDashBoard />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <BasicInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="basic-info"
            element={
              <ProtectedRoute>
                <BasicInfo />
              </ProtectedRoute>
            }
          />
          <Route path="results" element={<StudentResults />} />
        </Route>

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
          path="/developers"
          element={
            <NonDashboardRoute>
              <Developers />
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
          path="/student-corner/:id"
          element={
            <NonDashboardRoute>
              <BlogDetailPage />
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
            path="stat"
            element={
              <ProtectedRoute requiredRole="admin">
                <Stat />
              </ProtectedRoute>
            }
          />
          <Route
            path="batches"
            element={
              <ProtectedRoute requiredRole="admin">
                <Batches />
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
              <Navigate to="/" />
            </NonDashboardRoute>
          }
        />
      </Routes>
      {!isProtectedRoute && <FloatingDropdown setIsChatOpen={setIsChatOpen} />}
      <ChatbotModal isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
    </>
  );
}


function AppWrapper() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default AppWrapper;
