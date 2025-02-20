
import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';


const Scholarships = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "",
    email: "",
    address: "",
    phone: "",
    educationMode: "",
    marks: "",
    board: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.birthday) newErrors.birthday = "Birthday is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    
    if (!formData.phone) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits";

    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.educationMode) newErrors.educationMode = "Education mode is required";
    if (!formData.marks) newErrors.marks = "Marks are required";
    else if (isNaN(formData.marks)) newErrors.marks = "Marks must be a number";

    if (!formData.board) newErrors.board = "Board selection is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post("https://beacon-tutorial.vercel.app/server/scholarship/create", formData)
        .then((response) => {
          toast.success("Form submitted successfully.");
          // Proceed to the next POST request after the first one succeeds
          return axios.post("https://beacon-tutorial.vercel.app/server/student/scholarregsuccess", formData);
        })
        .then((response) => {
          toast.success("Check your email for confirmation.");
          // Clear the form once both requests succeed
          setFormData({
            firstName: "",
            lastName: "",
            birthday: "",
            gender: "",
            email: "",
            address: "",
            phone: "",
            educationMode: "",
            marks: "",
            board: "",
          });
        })
        .catch((error) => {
          toast.error("Error submitting form");
        });
    } else {
      console.log("Form validation failed");
    }
  };
  
  
  

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="flex flex-col items-center bg-gray-50 min-h-screen">
        {/* Header Section */}
        <div className="w-full bg-blue-500 p-8 text-center">
          <h1 className="text-3xl font-bold text-white">BEST - Talent Test</h1>
          <p className="text-lg text-white mt-2">
            Beacon Eligibility Cum Scholarship Test
          </p>
          <p className="text-white mt-1">
            Upto 90% Scholarship for qualifying students from 6th to 10th SSC |
            CBSE | ICSE
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl p-8 bg-white rounded-xl shadow-lg my-10 space-y-4"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Beacon Eligibility Cum Scholarship Test
          </h2>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-2 text-gray-600 font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="e.g., Jane"
                className="p-3 border border-gray-300 rounded-lg w-full"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-gray-600 font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="e.g., Garcia"
                className="p-3 border border-gray-300 rounded-lg w-full"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-2 text-gray-600 font-medium">Birthday</label>
              <input
                type="date"
                name="birthday"
                className="p-3 border border-gray-300 rounded-lg w-full"
                value={formData.birthday}
                onChange={handleInputChange}
              />
               {errors.birthday && <p className="text-red-500 text-sm">{errors.birthday}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-gray-600 font-medium">Gender</label>
              <select
                name="gender"
                className="p-3 border border-gray-300 rounded-lg w-full"
                value={formData.gender}
                onChange={handleInputChange}
              >
                  
                <option value="">Choose an option</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>
          </div>

          {/* Email and Education Mode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-2 text-gray-600 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="e.g., email@example.com"
                className="p-3 border border-gray-300 rounded-lg w-full"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-gray-600 font-medium">
                Mode of Education
              </label>
              <select
                name="educationMode"
                className="p-3 border border-gray-300 rounded-lg w-full"
                value={formData.educationMode}
                onChange={handleInputChange}
              >
                <option value="">Choose an option</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
              {errors.educationMode && <p className="text-red-500 text-sm">{errors.educationMode}</p>}
            </div>
          </div>

          {/* Address and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-2 text-gray-600 font-medium">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Enter address"
                className="p-3 border border-gray-300 rounded-lg w-full"
                value={formData.address}
                onChange={handleInputChange}
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-gray-600 font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="e.g., 555-555-555"
                className="p-3 border border-gray-300 rounded-lg w-full"
                value={formData.phone}
                onChange={handleInputChange}
              />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
          </div>

          {/* Marks and Board */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-2 text-gray-600 font-medium">Marks</label>
              <input
                type="text"
                name="marks"
                placeholder="Enter marks"
                className="p-3 border border-gray-300 rounded-lg w-full"
                value={formData.marks}
                onChange={handleInputChange}
              />
                {errors.marks && <p className="text-red-500 text-sm">{errors.marks}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-gray-600 font-medium">Board</label>
              <select
                name="board"
                className="p-3 border border-gray-300 rounded-lg w-full"
                value={formData.board}
                onChange={handleInputChange}
              >
                <option value="">Choose your board</option>
                <option value="ssc">SSC</option>
                <option value="cbse">CBSE</option>
                <option value="icse">ICSE</option>
              </select>
              {errors.board && <p className="text-red-500 text-sm">{errors.board}</p>}
          </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Apply
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Scholarships;
