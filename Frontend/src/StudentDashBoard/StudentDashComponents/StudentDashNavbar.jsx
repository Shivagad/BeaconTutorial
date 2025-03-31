import React, { useState } from "react";
import { Menu, LogOut, User, Bell } from "lucide-react";
import { useAuth } from "../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

const StudentDashNavbar = ({ toggleSidebar }) => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [showAlerts, setShowAlerts] = useState(false);

  const handleAlertClick = () => {
    setShowAlerts(!showAlerts);
  };

  return (
    <header className="w-full bg-white shadow-md fixed top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Left side: burger menu and logo */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none transition-colors" 
            aria-label="Toggle Sidebar"
          >
            <Menu className="h-6 w-6 text-[#4E77BB]" />
          </button>

          {/* Logo */}
          <div className="flex items-center">
            <img
              src={"/images/beacon.png"}
              alt="Beacon Logo"
              className="h-10 w-auto"
            />
            
            {/* Title (Hidden on small screens) */}
            <h1 className="text-[#4E77BB] font-bold text-lg hidden md:block ml-3">
              BEACON TUTORIALS
            </h1>
          </div>
        </div>

        {/* Center title for mobile */}
        <h2 className="text-gray-700 font-semibold md:hidden text-sm">
          Student Dashboard
        </h2>

        {/* Right side: user info and logout button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleAlertClick}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none transition-colors relative"
            aria-label="Reminders & Alerts"
          >
            <Bell className="h-6 w-6 text-gray-600" />
            {showAlerts && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4 z-50">
                <h3 className="text-sm font-semibold">Reminders & Alerts</h3>
                {/* Add your reminders and alerts here */}
                {/* here alerts should be placed dynamically */}
              </div>
            )}
          </button>

          <div className="hidden md:flex items-center mr-4">
            <User className="h-5 w-5 text-gray-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">
              {currentUser?.name}
            </span>
          </div>
          
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center"
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden md:inline ml-2 text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default StudentDashNavbar;