import React from "react"
import { MapPin, Mail, Phone, ExternalLink } from "lucide-react"

const branches = [
  {
    name: "Main Campus",
    address: "123 Education Avenue, Knowledge Park, New York, NY 10001",
    email: "maincampus@edutech.com",
    phone: "+1 (555) 123-4567",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Downtown Branch",
    address:
      "456 Learning Street, Innovation District, San Francisco, CA 94105",
    email: "downtown@edutech.com",
    phone: "+1 (555) 987-6543",
    image:
      "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  }
]

const BranchCard = ({ name, address, email, phone, image }) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
      {/* Background gradient overlay with animation */}
      <div className="absolute inset-0 opacity-70 group-hover:opacity-80 group-hover:bg-black transition-opacity duration-500 z-10"></div>

      {/* Background image with parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* Content */}
      <div className="relative z-20 p-8 h-full flex flex-col">
        {/* Animated decorative elements */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-white/30 rounded-tl-lg transform -translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-white/30 rounded-br-lg transform translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>

        {/* Branch name with animated underline */}
        <h3 className="text-3xl font-bold text-[#E85900] mb-2 relative inline-block">
          {name}
          <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-400 to-blue-200 group-hover:w-full transition-all duration-500"></span>
        </h3>

        {/* Contact information with icons */}
        <div className="mt-6 space-y-4 text-white/90">
          <div className="flex items-start space-x-3 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            <MapPin className="w-5 h-5 text-[#4E77BB] flex-shrink-0 mt-1" />
            <p>{address}</p>
          </div>

          <div className="flex items-center space-x-3 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
            <Mail className="w-5 h-5 text-[#4E77BB] flex-shrink-0" />
            <p>{email}</p>
          </div>

          <div className="flex items-center space-x-3 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-300">
            <Phone className="w-5 h-5 text-[#4E77BB] flex-shrink-0" />
            <p>{phone}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-auto pt-8 flex flex-col sm:flex-row gap-4 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-400">
          <button className="px-6 py-3 bg-white text-[#4E77BB] font-semibold rounded-lg shadow-lg hover:bg-blue-50 transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" />
            Contact Us
          </button>
          <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transform transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
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
    <div className="min-h-screen py-5 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto mt-3">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#4E77BB] to-[#4E77BB] bg-clip-text text-transparent mb-4">
            Our Locations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visit one of our premium coaching centers and experience excellence
            in education.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {branches.map((branch, index) => (
            <div
              key={index}
              className="h-[320px] transform transition-all duration-500 hover-float"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <BranchCard {...branch} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BranchCards
