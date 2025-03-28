import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import StudentDashSidebar from "./StudentDashSidebar";
import StudentDashNavbar from "./StudentDashNavbar";
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

  return (
    <><StudentDashNavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="bg-gray-100 min-h-screen">
        {/* Navbar at the top */}

        {/* Container below navbar: sidebar and main content */}
        <div className="flex">
          {/* {isSidebarOpen && (
            <StudentDashSidebar
              isOpen={isSidebarOpen}
              setIsOpen={setIsSidebarOpen}
              className="w-64 bg-white shadow-lg" // adjust styling as needed
            />
          )} */}
          <StudentDashSidebar
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
            // className={`fixed inset-y-0 left-0 z-50 transform bg-white shadow-lg transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            //   } md:relative md:translate-x-0 md:w-64`}
            className="w-64 bg-white shadow-lg"
          />

          <div
            className={`fixed
              ${!isSidebarOpen ? 'left-0' : 'left-64'}
               top-1/2 transform -translate-y-1/2 bg-[#4E77BB] rounded-r-full w-7 h-16 flex items-center justify-center cursor-pointer`}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="h-6 w-6 text-white" />
            ) : (
              <ChevronRight className="h-6 w-6 text-white" />
            )}
          </div>

          {/* Main content area */}
          <div className="flex-1 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
