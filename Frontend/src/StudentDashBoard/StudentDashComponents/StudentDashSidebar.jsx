import React from "react";
import { NavLink } from "react-router-dom";
import {
    UserCircle,
    GraduationCap,
} from "lucide-react";

const StudentDashSidebar = ({ isOpen, setIsOpen }) => {
    return (
        <div
            className={`fixed bg-gray-50 text-white transition-all duration-300 ease-in-out h-screen z-10 overflow-hidden ${isOpen ? "w-64" : "w-0"
                }`}
        >
            {/* Sidebar content visible only when open */}
            <nav className={`mt-0 ${isOpen ? "block" : "hidden"}`}>
                <NavLink
                    to="/student-dashboard/basic-info"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                        `flex items-center px-4 hover:bg-[#4E77BB] py-3 ${isActive && "bg-gray-200"
                        } transition-colors`
                    }
                >
                    <UserCircle className="h-6 w-6 text-black" />
                    <span className="ml-4 text-black">Profile Info</span>
                </NavLink>
                <div className="w-64 mx-auto border-b-4 border-[#4E77BB]"></div>
                <NavLink
                    to="/student-dashboard/results"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                        `flex items-center px-4 hover:bg-[#4E77BB] py-3 ${isActive && "bg-gray-200"
                        } transition-colors`
                    }
                >
                    <GraduationCap className="h-6 w-6 text-black" />
                    <span className="ml-4 text-black">Student Results</span>
                </NavLink>
                <div className="w-64 mx-auto border-b-4 border-[#4E77BB]"></div>
            </nav>

            {/* Toggle Handle: A semi-circle always visible on the right edge */}
        </div>

    );
};

export default StudentDashSidebar;
