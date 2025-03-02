import React from "react";
import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const branches = [
  {
    name: "Beacon Mohan Nagar",
    address: "123 Education Avenue, Knowledge Park, New York, NY 10001",
    email: "maincampus@edutech.com",
    phone: "+1 (555) 123-4567",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Beacon Suncity",
    address:
      "456 Learning Street, Innovation District, San Francisco, CA 94105",
    email: "downtown@edutech.com",
    phone: "+1 (555) 987-6543",
    image:
      "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  }
]

const BranchCard = ({ name, address, email, phone, image }) => {
  const navigate = useNavigate();
  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl min-h-[400px]">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 opacity-70 group-hover:opacity-80 group-hover:bg-black transition-opacity duration-500 z-10"></div>

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* Content */}
      <div className="relative z-20 p-6 sm:p-8 h-full flex flex-col">
        {/* Branch Name */}
        <h3 className="text-2xl sm:text-3xl font-bold text-[#E85900] mb-2 relative inline-block">
          {name}
          <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-400 to-blue-200 group-hover:w-full transition-all duration-500"></span>
        </h3>

        {/* Contact Information */}
        <div className="mt-4 space-y-3 text-white/90">
          <div className="flex items-start space-x-3 transition-all duration-500">
            <MapPin className="w-5 h-5 text-[#4E77BB] flex-shrink-0 mt-1" />
            <p className="text-sm sm:text-base">{address}</p>
          </div>

          <div className="flex items-center space-x-3 transition-all duration-500">
            <Mail className="w-5 h-5 text-[#4E77BB] flex-shrink-0" />
            <p className="text-sm sm:text-base">{email}</p>
          </div>

          <div className="flex items-center space-x-3 transition-all duration-500">
            <Phone className="w-5 h-5 text-[#4E77BB] flex-shrink-0" />
            <p className="text-sm sm:text-base">{phone}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-4 transition-all duration-500">
        <button
           onClick={() => {
            navigate("/contact");
            scrollTo(0, 0);
          }}
          
            className="px-5 py-2 sm:px-6 sm:py-3 bg-white text-[#4E77BB] font-semibold rounded-lg shadow-lg hover:bg-blue-50 transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Phone className="w-4 h-4" />
            Contact Us
          </button>
          {/* Navigate to Inquiry Page */}
          <button
            onClick={() => {
              navigate("/inquiry");
              scrollTo(0, 0);
            }}
            
            className="px-5 py-2 sm:px-6 sm:py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transform transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <ExternalLink className="w-4 h-4" />
            Inquire Now
          </button>
        </div>
      </div>
    </div>
  )
}

const BranchCards = () => {
  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto mt-3">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#4E77BB] to-[#4E77BB] bg-clip-text text-transparent mb-7">
            Our Locations
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Visit one of our premium coaching centers and experience excellence in education.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {branches.map((branch, index) => (
            <div key={index} className="w-full">
              <BranchCard {...branch} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BranchCards
