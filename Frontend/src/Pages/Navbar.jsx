import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Navbar = ({ logoSrc }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    'Home',
    'About Us',
    'Courses',
    'Results',
    'Testimonials',
    'Student Corner',
    'Scholarships',
    'Event Gallery',
    'Contact Us'
  ];

  return (
    <nav className="bg-white shadow-lg">
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
          <button className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition-colors">
            Login
          </button>
        </div>
      </div>

      {/* Main navbar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 mr-4">
            {logoSrc ? (
              <img src={logoSrc} alt="Logo" className="h-12 w-auto" />
            ) : (
              <div className="h-12 w-32 bg-gray-200 rounded animate-pulse" />
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ml-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
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
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mx-4">
                Login
              </button>
              
              {/* Mobile nav items */}
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2 hover:bg-gray-50"
                >
                  {item}
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
