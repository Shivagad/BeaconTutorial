import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import StudentDashSidebar from "./StudentDashSidebar";
import StudentDashNavbar from "./StudentDashNavbar";

const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  // Update sidebar visibility based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768); // Hide on mobile, show on larger screens
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar: Hidden on mobile, visible on larger screens */}
      <StudentDashSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        className={`fixed inset-y-0 left-0 z-50 transform bg-white shadow-lg transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-64`}
      />

      {/* Main content area */}
      <div className={`flex-1 flex-col overflow-hidden transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <StudentDashNavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Outlet />
      </div>
    </div>
  );
};

export default StudentDashboard;
