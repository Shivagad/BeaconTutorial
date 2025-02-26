import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Form submitted successfully!");
    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-orange-500 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold">Contact Us</h1>
            <p className="mt-2">We're here to help with any questions you might have</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              If you have any questions regarding our tuition services, please
              do not hesitate to contact us. Visit us today and we will be more
              than happy to answer any of your questions.
            </p>
          </div>

          {/* Contact Form and Info Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              {/* Contact Information */}
              <div className="bg-blue-100 p-10 md:w-1/3">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                <p className="text-gray-600 mb-8">
                  We're here to help! Use the contact information below or fill out the form.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <a href="mailto:beacontutorials7@gmail.com" className="text-gray-600 hover:text-blue-600">
                        beacontutorials7@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <a href="tel:+918446222268" className="text-gray-600 hover:text-blue-600">
                        +91 8446222268
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-10 md:w-2/3">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-3 bg-blue-50 px-4"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-3 bg-blue-50 px-4"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-3 bg-blue-50 px-4"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
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
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-3 bg-blue-50 px-4"
                    />
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      className="px-6 py-3 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-md shadow-sm transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Branches Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Locations</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* First Branch */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
                <div className="p-8 flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">First Branch</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                      <p className="text-gray-600">
                        Sr no. 34/16, Sai Park, Row house no 3, Mohan Nagar,
                        Dhankawadi, Pune, 411043
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <a
                        href="mailto:beacontutorials7@gmail.com"
                        className="text-gray-600 hover:text-blue-600"
                      >
                        beacontutorials7@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <a
                        href="tel:+918446222268"
                        className="text-gray-600 hover:text-blue-600"
                      >
                        +91 8446222268
                      </a>
                    </div>
                  </div>
                </div>
                <div className="h-80 w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15138.172850969771!2d73.82754296064374!3d18.45903780649374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eaca123c59b5%3A0xd7e3e42fdc95b01e!2sBeacon%20Tutorials!5e0!3m2!1sen!2sin!4v1739267453308!5m2!1sen!2sin"
                    className="w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Second Branch */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
                <div className="p-8 flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Second Branch</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                      <p className="text-gray-600">
                        Sr no. 34/16, Sai Park, Row house no 4, XYZ Nagar, Pune,
                        411044
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <a
                        href="mailto:secondbranch@beacontutorials.com"
                        className="text-gray-600 hover:text-blue-600"
                      >
                        secondbranch@beacontutorials.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <a
                        href="tel:+918446222269"
                        className="text-gray-600 hover:text-blue-600"
                      >
                        +91 8446222269
                      </a>
                    </div>
                  </div>
                </div>
                <div className="h-80 w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.760638841412!2d73.83248837465047!3d18.449173971352288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eb2b89376603%3A0x4aeee8283eb0fd05!2sSun%20City%20Ambegaon!5e0!3m2!1sen!2sin!4v1739270616028!5m2!1sen!2sin"
                    className="w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Contact;