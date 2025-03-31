import React, { useState, useEffect, Suspense, lazy } from "react";
import { Outlet, Navigate } from "react-router-dom";
import StudentDashNavbar from "./StudentDashNavbar";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const StudentDashSidebar = lazy(() => import('./StudentDashSidebar'));

const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  // Update sidebar visibility based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768); // show on larger screens, hide on mobile
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // set initial state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check if we're on the exact dashboard route and redirect to profile
  const path = window.location.pathname;
  if (path === "/student-dashboard" || path === "/student-dashboard/") {
    return <Navigate to="/student-dashboard/basic-info" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <StudentDashNavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-grow relative pt-16">
        {/* Sidebar */}
        <aside 
          className={`fixed top-16 bottom-0 left-0 z-30 h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'w-64' : 'w-0'
          } overflow-hidden bg-white shadow-lg`}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <StudentDashSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          </Suspense>
        </aside>

        {/* Main content area */}
        <main className={`flex-1 p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;