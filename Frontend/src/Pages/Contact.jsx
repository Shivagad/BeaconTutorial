import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { toast,ToastContainer  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Invalid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("https://beacon-tutorial.vercel.app/server/student/contactusemail", formData);
      console.log(response.data.success);
      if (response.data.success) {
        toast.success("Form submitted successfully!");
        setFormData({ name: "", phone: "", email: "", subject: "" });
        setErrors({});
      } else {
        toast.error("Failed to submit form. Please try again.");
      }
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
      console.error("Form submission error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              If you have any questions regarding our tuition services, please
              do not hesitate to contact us. Visit us today and we will be more
              than happy to answer any of your questions.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Card */}
            <div className="space-y-8 lg:col-span-1">
              <div className="bg-blue-100 p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Get in Touch
                </h2>
                <p className="text-gray-600 mb-6">
                  We're here to help! Fill out the form or use the contact
                  information below.
                </p>
                <div className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <a
                    href="mailto:beacontutorials7@gmail.com"
                    className="text-gray-700 hover:text-[#4E77BB]"
                  >
                    beacontutorials7@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 mt-4">
                  <Phone className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <a
                    href="tel:+918446222268"
                    className="text-gray-700 hover:text-[#4E77BB]"
                  >
                    +91 8446222268
                  </a>
                </div>
                <div className="mt-6 text-center">
      <button
        onClick={() => navigate("/inquiry")}
        className="bg-[#4E77BB] hover:bg-[#5786d9] text-white px-6 py-2 rounded-full transition-colors align-left"
      >
        Make an Inquiry
      </button>
    </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-lg border-4 shadow-md">
                <p className="text-lg text-gray-700 mb-8 text-center font-bold text-[#4E77BB]">
                  Alternatively, you can fill in the following contact form
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 flex flex-col"
                >
                  {/* Name Field */}
                  <div className="text-center">
                    <label
                      htmlFor="name"
                      className="block text-sm font-bold text-[#4E77BB]"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder="John"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-2 block w-3/4 rounded-md border border-[#4E77BB] shadow-sm focus:border-[#FFA500] focus:ring-[#FFA500] text-sm py-2 placeholder-gray-400 bg-[#EAF2FF] pl-4 mx-auto"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Phone Field */}
                  <div className="text-center">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-bold text-[#4E77BB]"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-2 block w-3/4 rounded-md border border-[#4E77BB] shadow-sm focus:border-[#FFA500] focus:ring-[#FFA500] text-sm py-2 placeholder-gray-400 bg-[#EAF2FF] pl-4 mx-auto"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* Email Field */}
                  <div className="text-center">
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold text-[#4E77BB]"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2 block w-3/4 rounded-md border border-[#4E77BB] shadow-sm focus:border-[#FFA500] focus:ring-[#FFA500] text-sm py-2 placeholder-gray-400 bg-[#EAF2FF] pl-4 mx-auto"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Subject Field */}
                  <div className="text-center">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-bold text-[#4E77BB]"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      placeholder="Inquiry about tuition services"
                      value={formData.subject}
                      onChange={handleChange}
                      className="mt-2 block w-3/4 rounded-md border border-[#4E77BB] shadow-sm focus:border-[#FFA500] focus:ring-[#FFA500] text-sm py-2 placeholder-gray-400 bg-[#EAF2FF] pl-4 mx-auto"
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-auto px-6 py-2 text-sm font-bold text-white bg-[#FFA500] hover:bg-[#E69500] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFA500] rounded-md shadow-md transition-colors mx-auto block"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Addresses and Maps Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* First Branch */}
            <div className="flex flex-col space-y-6">
              {/* Address Card */}
              <div className="bg-white p-6 rounded-lg shadow-md flex-grow">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">First Branch - Address</h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-6 h-6 text-[#4E77BB] mt-1 flex-shrink-0" />
                    <p className="text-gray-700">
                    Beacon Mohan Nagar,Dhankawadi,
                    Pune-411043
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-6 h-6 text-[#4E77BB] flex-shrink-0" />
                    <a href="mailto:beacontutorials7@gmail.com" className="text-gray-700 hover:text-[#4E77BB]">
                      beacontutorials7@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-6 h-6 text-[#4E77BB] flex-shrink-0" />
                    <a href="tel:+918446222268" className="text-gray-700 hover:text-[#4E77BB]">
                      +91 8446222268
                    </a>
                  </div>
                </div>
              </div>

              {/* Google Map - Business Info Visible */}
              <div className="relative w-full h-80 rounded-lg shadow-md bg-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15138.172850969771!2d73.82754296064374!3d18.45903780649374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eaca123c59b5%3A0xd7e3e42fdc95b01e!2sBeacon%20Tutorials!5e0!3m2!1sen!2sin!4v1739267453308!5m2!1sen!2sin"
                  className="absolute top-0 left-0 w-full h-full"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Second Branch */}
            <div className="flex flex-col space-y-6">
              {/* Address Card */}
              <div className="bg-white p-6 rounded-lg shadow-md flex-grow">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Second Branch - Address</h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-6 h-6 text-[#4E77BB] mt-1 flex-shrink-0" />
                    <p className="text-gray-700">
                     Beacon Suncity,Ambegaon, Pune-411046.
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-6 h-6 text-[#4E77BB] flex-shrink-0" />
                    <a href="mailto:beacontutorials02.suncity@gmail.com" className="text-gray-700 hover:text-[#4E77BB]">
                    beacontutorials02.suncity@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-6 h-6 text-[#4E77BB] flex-shrink-0" />
                    <a href="tel:+919527069991" className="text-gray-700 hover:text-[#4E77BB]">
                      +91 9527069991
                    </a>
                  </div>
                </div>
              </div>

              {/* Google Map - Business Info Visible */}
              <div className="relative w-full h-80 rounded-lg shadow-md bg-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.760638841412!2d73.83248837465047!3d18.449173971352288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eb2b89376603%3A0x4aeee8283eb0fd05!2sSun%20City%20Ambegaon!5e0!3m2!1sen!2sin!4v1739270616028!5m2!1sen!2sin"
                  className="absolute top-0 left-0 w-full h-full"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}


