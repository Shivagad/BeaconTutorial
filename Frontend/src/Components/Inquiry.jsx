import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "Male",
    address: "",
    city: "",
    state: "",
    previousStandard: "",
    previousStandardMarks: "",
    inquiryFor: "CET",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:4000/server/inquiry", formData);
      if (response.status === 200) {
        setIsSubmitting(false);
        toast.success("Form submitted successfully!");
        toast.success("Email of Confirmation has been sent!");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          gender: "Male",
          address: "",
          city: "",
          state: "",
          previousStandard: "",
          previousStandardMarks: "",
          inquiryFor: "CET",
          message: "",
        });
      } else {
        toast.error("Failed to submit form.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
        <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
          {isSubmitting ? (
            <div className="space-y-4">
              <Skeleton height={40} width={`100%`} />
              <div className="flex space-x-4">
                <Skeleton height={40} width="48%" />
                <Skeleton height={40} width="48%" />
              </div>
              <Skeleton height={40} width={`100%`} />
              <Skeleton height={40} width={`100%`} />
              <div className="flex space-x-4">
                <Skeleton height={40} width="48%" />
                <Skeleton height={40} width="48%" />
              </div>
              <Skeleton height={40} width={`100%`} />
              <Skeleton height={60} width={`100%`} />
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-center mb-4">Inquiry Form</h1>
              <p className="text-center mb-6 text-gray-600">
                Fill out our contact form to get in touch with Beacon Tutorials, one of the best coaching classes for JEE, NEET and CET exams in Pune.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block font-medium mb-1">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      required
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block font-medium mb-1">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      required
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-medium mb-1">Phone Number *</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Gender</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Male
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Female
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block font-medium mb-1">Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    required
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block font-medium mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                      required
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block font-medium mb-1">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter your state"
                      required
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-medium mb-1">Previous Standard</label>
                  <input
                    type="text"
                    name="previousStandard"
                    value={formData.previousStandard}
                    onChange={handleInputChange}
                    placeholder="Enter your previous standard"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Previous Standard Marks</label>
                  <input
                    type="text"
                    name="previousStandardMarks"
                    value={formData.previousStandardMarks}
                    onChange={handleInputChange}
                    placeholder="Enter your previous standard marks"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Inquiry For</label>
                  <select
                    name="inquiryFor"
                    value={formData.inquiryFor}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="CET">CET</option>
                    <option value="JEE Main/JEE Advance">JEE Main/JEE Advance</option>
                    <option value="NEET">NEET</option>
                    <option value="Foundations">Foundations</option>
                    <option value="HSC/CBSE/ICSE">HSC/CBSE/ICSE</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter any additional message"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-[#4e77bb] text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Send
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InquiryForm;
