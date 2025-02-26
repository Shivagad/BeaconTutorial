import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';
import logo from '../../public/images/logo.png'

const Navbar = ({ logoSrc }) => {
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
      {/* Top bar with contact info */}
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
          {currentUser ? (
            <div className="relative">
              {/* Profile Icon with Dropdown */}
              <img
                className="h-7 w-7 cursor-pointer rounded-full"
                src={currentUser.profilePicture}
                alt="Profile"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-40">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full text-gray-700 px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
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
              onClick={() => { navigate(`/login`) }}
              className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Main navbar */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-6 h-20 items-end">
          {/* Logo */}
          {
            !isOpen && (
              <div className="flex-shrink-0 mr-4">
                {logo ? (
                  <div className="absolute top-0 left-4 h-full flex items-center">
                    <img
                      src={logo}
                      alt="Logo"
                      className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-26 w-auto"
                    />
                  </div>

                ) : (
                  <div className="h-12 w-32 bg-gray-200 rounded animate-pulse" />
                )}
              </div>
            )
          }

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 ml-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.path}
                className="text-gray-700 hover:text-[#4e77bb] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              {/* Mobile contact info */}
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded">
                <Phone size={16} className="text-gray-600" />
                <span className="text-sm text-gray-600">+1 234 567 8900</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded">
                <Mail size={16} className="text-gray-600" />
                <span className="text-sm text-gray-600">info@example.com</span>
              </div>
              {currentUser ? (
                <div className="flex items-center space-x-4 px-4 py-2 bg-gray-50 rounded">
                  <img className="h-7 w-7" src={currentUser.profilePicture} alt="Profile" />
                  <div className="flex flex-col">
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="text-gray-700 hover:text-blue-600"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                      className="text-gray-700 hover:text-blue-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { navigate(`/login`) }}
                  className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>
              )}

              {/* Mobile nav items */}
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.path}
                  className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2 hover:bg-gray-50"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
