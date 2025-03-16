import React from 'react';
import { FaInstagram, FaLinkedin, FaFacebook, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#23395d] to-[#23395d] text-white py-16 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* New sections - Why Choose Us and About Us stacked vertically */}
        <div className="grid grid-cols-1 gap-8 mb-12">
          <div className="bg-[#1c2e4a] p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-orange-500 mb-4">Why Choose Us?</h3>
            <ul className="list-disc pl-5 space-y-2 text-white">
              <li className="leading-relaxed">
                At Beacon Tutorials, we recognize that learning is pivotal for a student's success in academics and life. The Digital Age is deeply shaping the way students learn and will determine their future prospects. We encourage students to embrace this fast-changing world and make them ready for tomorrow by being their constant learning partner.
              </li>
              <li className="leading-relaxed">
                Our structured curriculum ensures comprehensive coverage of all subjects and topics.
              </li>
              <li className="leading-relaxed">
                Interactive learning methods keep students engaged and promote better understanding.
              </li>
              <li className="leading-relaxed">
                Regular assessments help track progress and identify areas for improvement.
              </li>
              <li className="leading-relaxed">
                We focus on academic excellence through personalized attention and guidance.
              </li>
            </ul>
          </div>
          
          <div className="bg-[#1c2e4a] p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-orange-500 mb-4">About Us</h3>
            <p className="text-white leading-relaxed">
              Beacon Tutorials is a premier coaching institute dedicated to helping students excel in SSC, CBSE, ICSE, NEET, and JEE exams. With expert faculty, structured courses, and a student-focused approach, we ensure academic success and competitive excellence. Join us to achieve your educational goals with confidence!
            </p>
          </div>
        </div>

        {/* Original footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-orange-500 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-white hover:text-orange-300 transition-colors">About Us</a></li>
              <li><a href="/courses" className="text-white hover:text-orange-300 transition-colors">Our Courses</a></li>
              <li><a href="/scholarships" className="text-white hover:text-orange-300 transition-colors">Scholarships</a></li>
              <li><a href="/all-results" className="text-white hover:text-orange-300 transition-colors">Our Results</a></li>
              <li><a href="/testimonial" className="text-white hover:text-orange-300 transition-colors">Testimonials</a></li>
              <li><a href="/event-gallery" className="text-white hover:text-orange-300 transition-colors">Event Gallary</a></li>
              <li><a href="/contact" className="text-white hover:text-orange-300 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Admission Policies */}
          <div>
              <h3 className="text-xl font-semibold text-orange-500 mb-4">Admission Policies</h3>
              <ul className="space-y-2">
                <li><a href="/all-courses#8th-9th-10th-foundation" className="text-white hover:text-orange-300 transition-colors">8th, 9th, 10th Foundation</a></li>
                <li><a href="/all-courses#8th-9th-10th-regular-board-batches" className="text-white hover:text-orange-300 transition-colors">8th, 9th, 10th Regular Board Batches</a></li>
                <li><a href="/all-courses#ssc" className="text-white hover:text-orange-300 transition-colors">SSC</a></li>
                <li><a href="/all-courses#cbse" className="text-white hover:text-orange-300 transition-colors">CBSE</a></li>
                <li><a href="/all-courses#icse" className="text-white hover:text-orange-300 transition-colors">ICSE</a></li>
                <li><a href="/all-courses#11th-12th-board-classes" className="text-white hover:text-orange-300 transition-colors">11th + 12th Board Classes</a></li>
                <li><a href="/all-courses#11th-12th-jee-mains-advance" className="text-white hover:text-orange-300 transition-colors">11th + 12th JEE Mains + Advance</a></li>
                <li><a href="/all-courses#11th-12th-neet" className="text-white hover:text-orange-300 transition-colors">11th + 12th NEET</a></li>
                <li><a href="/all-courses#11th-12th-iiser" className="text-white hover:text-orange-300 transition-colors">11th + 12th IISER</a></li>
                <li><a href="/all-courses#11th-12th-mhtcet" className="text-white hover:text-orange-300 transition-colors">11th + 12th MHTCET</a></li>
                <li><a href="/all-courses#11th-12th-nda" className="text-white hover:text-orange-300 transition-colors">11th + 12th NDA</a></li>
                <li><a href="/all-courses#11th-12th-cuet" className="text-white hover:text-orange-300 transition-colors">11th + 12th CUET</a></li>
                <li><a href="/all-courses#hsc" className="text-white hover:text-orange-300 transition-colors">HSC</a></li>
                <li><a href="/all-courses#jee-mains" className="text-white hover:text-orange-300 transition-colors">JEE Mains</a></li>
                <li><a href="/all-courses#jee-advanced" className="text-white hover:text-orange-300 transition-colors">JEE Advanced</a></li>
                <li><a href="/all-courses#jee-mains-advance" className="text-white hover:text-orange-300 transition-colors">JEE (Mains + Advance)</a></li>
                <li><a href="/all-courses#neet" className="text-white hover:text-orange-300 transition-colors">NEET</a></li>
                <li><a href="/all-courses#neet-foundation" className="text-white hover:text-orange-300 transition-colors">NEET Foundation</a></li>
                <li><a href="/all-courses#neet-repeaters" className="text-white hover:text-orange-300 transition-colors">NEET Repeaters</a></li>
                <li><a href="/all-courses#mht-cet" className="text-white hover:text-orange-300 transition-colors">MHT - CET</a></li>
                <li><a href="/all-courses#nda" className="text-white hover:text-orange-300 transition-colors">NDA</a></li>
                <li><a href="/all-courses#ntse" className="text-white hover:text-orange-300 transition-colors">NTSE</a></li>
                <li><a href="/all-courses#iiser" className="text-white hover:text-orange-300 transition-colors">IISER</a></li>
                <li><a href="/all-courses#cuet" className="text-white hover:text-orange-300 transition-colors">CUET</a></li>
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

        <div className="text-center mt-12 pt-6 border-t border-gray-700">
          <p className="text-sm text-white">
            &copy; 2025 Beacon Tutorials | All Rights Reserved | Empowering Future Leaders
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;