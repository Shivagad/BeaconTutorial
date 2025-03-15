// StudentDashboardLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentDashSidebar from "./StudentDashSidebar";
import StudentDashNavbar from "./StudentDashNavbar";

const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
    <div className="flex h-screen bg-gray-100">
      <StudentDashSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={`flex-1 flex-col overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
      <StudentDashNavbar  toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default StudentDashboard;
