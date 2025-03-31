import React from "react";
import { NavLink } from "react-router-dom";
import {
  UserCircle,
  GraduationCap,
  FileText,
  Calendar,
  Book,
  ClipboardCheck
} from "lucide-react";
import { useAuth } from "../../Context/AuthProvider";

const StudentDashSidebar = ({ isOpen, toggleSidebar }) => {
  const { currentUser } = useAuth();

  const handleNavLinkClick = () => {
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };
  
  return (
    <div className={`h-full flex flex-col bg-white fixed top-16 left-0 transition-width duration-300 ease-in-out ${
      isOpen ? 'w-64' : 'w-0'
    } overflow-hidden`}>
      {/* User profile section */}
      <div className={`p-4 border-b border-gray-200 transition-opacity duration-300 ease-in-out ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-[#4E77BB] flex items-center justify-center text-white text-xl font-bold mb-2">
            {currentUser?.name?.charAt(0) || "S"}
          </div>
          <h3 className="font-medium text-gray-800 text-sm mt-1">{currentUser?.name}</h3>
          <p className="text-xs text-gray-500 mt-1">Roll No: {currentUser?.rollNo}</p>
        </div>
      </div>
      
      {/* Navigation links */}
      <nav className="flex-grow py-2 overflow-auto">
        <p className={`px-4 text-xs font-semibold text-gray-500 uppercase mb-2 mt-2 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}>Main Menu</p>
        
        <NavLink 
          to="/student-dashboard/basic-info" 
          className={({ isActive }) => `
            flex items-center px-4 py-2.5 mb-1 mx-2
            ${isActive ? 'bg-blue-50 text-[#4E77BB]' : 'text-gray-700 hover:bg-gray-100'} 
            rounded-md transition-colors
          `}
          onClick={handleNavLinkClick}
        >
          <UserCircle className="h-5 w-5" />
          <span className="ml-3 text-sm">Profile Info</span>
        </NavLink>
        
        <NavLink 
          to="/student-dashboard/results" 
          className={({ isActive }) => `
            flex items-center px-4 py-2.5 mb-1 mx-2
            ${isActive ? 'bg-blue-50 text-[#4E77BB]' : 'text-gray-700 hover:bg-gray-100'} 
            rounded-md transition-colors
          `}
          onClick={handleNavLinkClick}
        >
          <GraduationCap className="h-5 w-5" />
          <span className="ml-3 text-sm">Results</span>
        </NavLink>
        
        <NavLink 
          to="/student-dashboard/attendance" 
          className={({ isActive }) => `
            flex items-center px-4 py-2.5 mb-1 mx-2
            ${isActive ? 'bg-blue-50 text-[#4E77BB]' : 'text-gray-700 hover:bg-gray-100'} 
            rounded-md transition-colors
          `}
          onClick={handleNavLinkClick}
        >
          <ClipboardCheck className="h-5 w-5" />
          <span className="ml-3 text-sm">Attendance</span>
        </NavLink>

        <p className={`px-4 text-xs font-semibold text-gray-500 uppercase mb-2 mt-6 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}>Resources</p>
        
        <NavLink 
          to="/student-dashboard/schedule" 
          className={({ isActive }) => `
            flex items-center px-4 py-2.5 mb-1 mx-2
            ${isActive ? 'bg-blue-50 text-[#4E77BB]' : 'text-gray-700 hover:bg-gray-100'} 
            rounded-md transition-colors
          `}
          onClick={handleNavLinkClick}
        >
          <Calendar className="h-5 w-5" />
          <span className="ml-3 text-sm">Schedule</span>
        </NavLink>
        
        <NavLink 
          to="/student-dashboard/materials" 
          className={({ isActive }) => `
            flex items-center px-4 py-2.5 mb-1 mx-2
            ${isActive ? 'bg-blue-50 text-[#4E77BB]' : 'text-gray-700 hover:bg-gray-100'} 
            rounded-md transition-colors
          `}
          onClick={handleNavLinkClick}
        >
          <Book className="h-5 w-5" />
          <span className="ml-3 text-sm">Study Materials</span>
        </NavLink>
        
        <NavLink 
          to="/student-dashboard/assignments" 
          className={({ isActive }) => `
            flex items-center px-4 py-2.5 mb-1 mx-2
            ${isActive ? 'bg-blue-50 text-[#4E77BB]' : 'text-gray-700 hover:bg-gray-100'} 
            rounded-md transition-colors
          `}
          onClick={handleNavLinkClick}
        >
          <FileText className="h-5 w-5" />
          <span className="ml-3 text-sm">Assignments</span>
        </NavLink>
      </nav>
      
      {/* Footer */}
      <div className={`p-4 text-center border-t border-gray-200 transition-opacity duration-300 ease-in-out ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}>
        <p className="text-xs text-gray-500">© 2025 Beacon Tutorials</p>
      </div>
    </div>
  );
};

export default StudentDashSidebar;