import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import toast, { Toaster } from "react-hot-toast";
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
    branch:"Beacon Mohan Nagar",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phonePattern = /^[6-9]\d{9}$/; 
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
  if (!phonePattern.test(formData.phone)) {
    toast.error("Please enter a valid 10-digit phone number.");
    return;
  }

  // Email validation
  if (!emailPattern.test(formData.email)) {
    toast.error("Please enter a valid email address.");
    return;
  }
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/server/inquiry",
        formData
      );
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
      <Toaster position="top-right" />
      <Navbar />
      <div className="min-h-screen">
      <div className="bg-[#4E77BB] pt-12 pb-24 relative shadow-md">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-4xl font-bold text-white mb-4">
              Inquiry
            </h1>
            <p className="text-white text-center max-w-2xl mx-auto">
            At Beacon Tutorials, we are committed to our students' all-around development, which is why we invite you to fill our inquiry form and start your journey.
            </p>
          </div>
          {/* Wave SVG */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 100" className="w-full h-auto">
              <path
                fill="#fff"
                fillOpacity="1"
                d="M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,58.7C1120,53,1280,43,1360,37.3L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center mx-auto max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
            <>
              <h1 className="text-2xl font-bold text-center mb-4">
                Inquiry Form
              </h1>
              <p className="text-center mb-6 text-gray-600">
                Fill out our contact form to get in touch with Beacon Tutorials,
                one of the best coaching classes for JEE, NEET and CET exams in
                Pune.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block font-medium mb-1">
                      First Name *
                    </label>
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
                    <label className="block font-medium mb-1">
                      Last Name *
                    </label>
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
                  <label className="block font-medium mb-1">
                    Phone Number *
                  </label>
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
                  <label className="block font-medium mb-1">Gender*</label>
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
                    <label className="flex items-center">
                    <input
                        type="radio"
                        name="gender"
                        value="Other"
                        checked={formData.gender === "Other"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Other
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block font-medium mb-1">Address </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block font-medium mb-1">City </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                    
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block font-medium mb-1">State </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter your state"
                     
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-medium mb-1">
                    Previous Standard*
                  </label>
                  <input
                    type="text"
                    name="previousStandard"
                    value={formData.previousStandard}
                    onChange={handleInputChange}
                    placeholder="Enter your previous standard"
                    required
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">
                    Previous Standard Marks
                  </label>
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
                  <label className="block font-medium mb-1">Inquiry For*</label>
                  <select
                    name="inquiryFor"
                    value={formData.inquiryFor}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="8th,9th,10th Regular">
                      8th, 9th, 10th Regular
                    </option>
                    <option value="8th,9th,10th Foundation">
                      8th, 9th, 10th Foundation
                    </option>
                    <option value="CBSE, SSC, ICSE">CBSE, SSC, ICSE</option>
                    <option value="JEE (Mains + Advance)">
                      JEE (Mains + Advance)
                    </option>
                    <option value="NEET">NEET</option>
                    <option value="NDA">NDA</option>
                    <option value="MHTCET">MHTCET</option>
                    <option value="ISSER">ISSER</option>
                    <option value="CUET">CUET</option>
                    <option value="11th+12th Board Classes">
                      11th + 12th Board Classes
                    </option>
                    <option value="11th+12th JEE Mains + Advance">
                      11th + 12th JEE Mains + Advance
                    </option>
                    <option value="11th+12th NEET">11th + 12th NEET</option>
                    <option value="11th+12th ISSER">11th + 12th ISSER</option>
                    <option value="11th+12th MHTCET">11th + 12th MHTCET</option>
                    <option value="11th+12th NDA">11th + 12th NDA</option>
                    <option value="11th+12th CUET">11th + 12th CUET</option>
                    <option value="NEET Repeaters">NEET Repeaters</option>
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

                
                <div>
                  <label className="block font-medium mb-1">Inquiry For Which Branch*</label>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Beacon Mohan Nagar">Beacon Mohan Nagar</option>
                    <option value="Beacon SunCity">Beacon SunCity</option>
                  </select>
                </div>
                <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#4e77bb] text-white px-4 py-2 rounded-lg hover:bg-[#6ea3fa] hover:text-black flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full"
                    viewBox="0 0 24 24"
                  ></svg>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
              </form>
            </>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InquiryForm;
