import React from 'react';
import { FaInstagram, FaLinkedin, FaFacebook, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#23395d] to-[#23395d] text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-orange-500 mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#about-us" className="hover:underline">About Us</a></li>
            <li><a href="#courses" className="hover:underline">Our Courses</a></li>
            <li><a href="#scholarships" className="hover:underline">Scholarships</a></li>
            <li><a href="#results" className="hover:underline">Our Results</a></li>
            <li><a href="#testimonials" className="hover:underline">Testimonials</a></li>
          </ul>
        </div>

        {/* Admission Policies */}
        <div>
          <h3 className="text-xl font-semibold text-orange-500 mb-4">Admission Policies</h3>
          <ul className="space-y-2">
            <li>JEE Mains</li>
            <li>CBSE</li>
            <li>HSC & SSC</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold text-orange-500 mb-4">Social Links</h3>
          <div className="flex justify-center space-x-4">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="h-6 w-6 text-[#23395d] bg-white rounded-full p-1" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="h-6 w-6 text-[#23395d] bg-white rounded-full p-1" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="h-6 w-6 text-[#23395d] bg-white rounded-full p-1" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="h-6 w-6 text-[#23395d] bg-white rounded-full p-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;