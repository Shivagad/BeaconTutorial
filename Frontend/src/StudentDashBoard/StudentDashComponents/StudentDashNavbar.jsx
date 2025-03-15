import React from "react"
import { Menu, LogOut } from "lucide-react"
import { useAuth } from "../../Context/AuthProvider"

const StudentDashNavbar = ({ toggleSidebar }) => {
  const {logout} =useAuth();
  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        <button
           onClick={() => { logout(); navigate('/login'); }}
          className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  )
}

export default StudentDashNavbar;
