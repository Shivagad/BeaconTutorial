import React from "react"
import { NavLink } from "react-router-dom"
import {
    UserCircle,
    GraduationCap,
    ChevronLeft,
    ChevronRight
} from "lucide-react"

const StudentDashSidebar = ({ isOpen, setIsOpen }) => {
    return (
        <div
            className={`fixed bg-gray-800 text-white transition-all duration-300 h-screen z-10 ${isOpen ? "w-64" : "w-0"
                }`}
        >
            <div className="flex items-center justify-between p-4">
                <h1 className={`font-bold ${isOpen ? "block" : "hidden"}`}>
                    Student Dashboard
                </h1>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-1 rounded-full hover:bg-gray-700"
                    aria-label={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
                >
                    {isOpen ? (
                        <ChevronLeft className="h-6 w-6" />
                    ) : (
                        <ChevronRight className="h-6 w-6" />
                    )}
                </button>
            </div>

            <nav className="mt-8">
                <NavLink
                    to="/student-dashboard/basic-info"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 ${isActive ? "bg-gray-700 " : "hover:bg-gray-700"
                        } transition-colors`
                    }
                >
                    <UserCircle className="h-6 w-6" />
                    <span className={`ml-4 ${isOpen ? "block" : "hidden"}`}>
                        Basic Info
                    </span>
                </NavLink>
                <NavLink
                    to="/student-dashboard/results"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 ${isActive ? "bg-gray-700" : "hover:bg-gray-700"
                        } transition-colors`
                    }
                >
                    <GraduationCap className="h-6 w-6" />
                    <span className={`ml-4 ${isOpen ? "block" : "hidden"}`}>
                        Student Results
                    </span>
                </NavLink>
            </nav>
        </div>
    )
}

export default StudentDashSidebar
