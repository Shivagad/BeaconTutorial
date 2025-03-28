import React from "react";
import { Menu, LogOut } from "lucide-react";
import { useAuth } from "../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

const StudentDashNavbar = ({ toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-8 py-2">
        {/* Left side: burger menu and logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <img
            src={"/images/beacon.png"}
            alt="Beacon Logo"
            className="h-10 w-12"
          />

          {/* Title (Hidden on small screens) */}
          <h1 className="text-black font-bold hidden md:flex">
            BEACON TUTORIALS STUDENT DASHBOARD, Pune
          </h1>
        </div>

        {/* Right side: logout button (icon only on small screens) */}
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center"
        >
          <LogOut className="h-6 w-6" />
          <span className="hidden md:inline ml-2">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default StudentDashNavbar;
