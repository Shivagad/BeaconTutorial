import React, { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import logoSrc from "../../public/images/logo.png"; // Ensure correct logo import

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Courses", path: "/all-courses" },
    { label: "Results", path: "/all-results" },
    { label: "Testimonials", path: "/testimonial" },
    { label: "Student Corner", path: "/student-corner" },
    { label: "Scholarships", path: "/scholarship" },
    { label: "Event Gallery", path: "/event-gallery" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar (Contact Info) - Visible on md and larger */}
      <div className="hidden md:block bg-gray-100 py-2">
        <div className="container mx-auto px-4 flex justify-end items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Phone size={16} className="text-gray-600" />
            <span className="text-sm text-gray-600">+1 234 567 8900</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail size={16} className="text-gray-600" />
            <span className="text-sm text-gray-600">info@example.com</span>
          </div>

          {/* Profile Dropdown */}
          {currentUser ? (
            <div className="relative">
              <img
                className="h-7 w-7 cursor-pointer rounded-full"
                src={currentUser.profilePicture}
                alt="Profile"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-40">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full text-gray-700 px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="w-full text-gray-700 px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-[#4E77BB] text-white px-4 py-1 rounded-md hover:bg-[#6ea3fa] hover:text-black transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src={logoSrc}
                alt="Logo"
                className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-26 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation (Visible on lg and larger) */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-gray-700 hover:text-[#4e77bb] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile & Tablet Menu Button (md and smaller) */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <Menu size={24} />

            </button>
          </div>
        </div>

        {/* Mobile Sidebar (Visible on md and below) */}
        {isOpen && (
          <div className="fixed inset-0 bg-white shadow-lg z-50 flex flex-col w-3/4 md:w-1/2 h-full p-4">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="self-end text-gray-700 hover:text-red-600"
            >
              <X size={24} />
            </button>

            {/* Mobile Contact Info */}
            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded">
              <Phone size={16} className="text-gray-600" />
              <span className="text-sm text-gray-600">+1 234 567 8900</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded">
              <Mail size={16} className="text-gray-600" />
              <span className="text-sm text-gray-600">info@example.com</span>
            </div>

            {/* Mobile Profile/Login */}
            {currentUser ? (
              <div className="flex items-center space-x-4 px-4 py-2 bg-gray-50 rounded">
                <img
                  className="h-7 w-7 rounded-full"
                  src={currentUser.profilePicture}
                  alt="Profile"
                />
                <div className="flex flex-col">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-[#4E77BB] text-white px-4 py-1 rounded-md hover:bg-[#6ea3fa] hover:text-black transition-colors"
              >
                Login
              </button>
            )}

            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-2 mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)} // Close menu on click
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
