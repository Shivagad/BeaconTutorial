import React from 'react';
import { FaInstagram, FaLinkedin, FaFacebook, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#23395d] to-[#23395d] text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-orange-500 mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="text-white">About Us</a></li>
            <li><a href="/courses" className="text-white">Our Courses</a></li>
            <li><a href="/scholarships" className="text-white">Scholarships</a></li>
            <li><a href="/all-results" className="text-white">Our Results</a></li>
            <li><a href="/testimonial" className="text-white">Testimonials</a></li>
          </ul>
        </div>


        {/* Admission Policies */}
        <div>
          <h3 className="text-xl font-semibold text-orange-500 mb-4">Admission Policies</h3>
          <ul className="space-y-2">
            <li><a href="/jee-mains" className="text-white">JEE Mains</a></li>
            <li><a href="/cbse" className="text-white">CBSE</a></li>
            <li><a href="/hsc-ssc" className="text-white">HSC & SSC</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold text-orange-500 mb-4">Connect with Us</h3>
          <div className="flex justify-center sm:justify-start space-x-4">
            <a href="https://www.instagram.com/beacontutorialspune" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="h-8 w-8 text-[#23395d] bg-white rounded-full p-2 hover:scale-110 transition-all duration-300" />
            </a>
            <a href="https://www.linkedin.com/company/beacon-tutorials/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="h-8 w-8 text-[#23395d] bg-white rounded-full p-2 hover:scale-110 transition-all duration-300" />
            </a>
            <a href="https://www.facebook.com/BeaconTutorialsPune" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="h-8 w-8 text-[#23395d] bg-white rounded-full p-2 hover:scale-110 transition-all duration-300" />
            </a>
            <a href="https://youtube.com/@beacontutorialspune8750?si=RP78K2qNM22wySJm" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="h-8 w-8 text-[#23395d] bg-white rounded-full p-2 hover:scale-110 transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-white">
          &copy; 2025 Beacon Tutorials | All Rights Reserved | Empowering Future Leaders
        </p>
      </div>
    </footer>
  );
};

export default Footer;
