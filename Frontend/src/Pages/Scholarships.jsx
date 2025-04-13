
import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import scolarship from '../../public/images/scolarship.png';

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
    SchoolName:"",
  });


const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData,[name]: value.trim()});
  };

  const validateForm = () => {
    const phonePattern = /^[6-9]\d{9}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.birthday) newErrors.birthday = "Birthday is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.email) newErrors.email = "Email is required";
   else if (!emailPattern.test(formData.email)) newErrors.email = "Invalid email format";
   if (!formData.phone) newErrors.phone = "Phone is required";
   else if (!phonePattern.test(formData.phone)) newErrors.phone = "Phone number must start with 6-9 and be 10 digits long";
    if (!formData.marks) newErrors.marks = "Marks are required";
    else if (isNaN(formData.marks)) newErrors.marks = "Marks must be a number";
    if (!formData.board) newErrors.board = "Board selection is required";
    if (!formData.SchoolName) newErrors.SchoolName = "School Name selection is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post("http://localhost:4000/server/scholarship/create", formData)
        .then((response) => {
          toast.success("Form submitted successfully.");
          // Proceed to the next POST request after the first one succeeds
          return axios.post("http://localhost:4000/server/student/scholarregsuccess", formData);
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
            educationMode: "offline",
            marks: "",
            board: "",
            SchoolName:"",
          });
        })
        .catch((error) => {
          toast.error("Error submitting form");
        });
    } else {
      // console.log("Form validation failed");
    }
  };
  
  
  

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className=" min-h-screen">
        <div className="bg-[#4E77BB] pt-12 pb-24 relative shadow-md">
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="flex justify-center mb-1">
                                      <img
                                      src={scolarship}
                                      className="h-20 w-20 filter invert brightness-0 contrast-200"
                                      ></img>
                                        </div>
            <h1 className="text-4xl font-bold text-white mb-4">
            Beacon Eligibility Cum Scholarship Test
            </h1>
            <p className="text-white text-center max-w-2xl mx-auto">
            Upto 90% Scholarship for qualifying students from 6th to 10th SSC |
            CBSE | ICSE
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

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-center mx-auto max-w-2xl bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Beacon Eligibility Cum Scholarship Test
          </h2>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-2 text-gray-600 font-medium">First Name*</label>
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
              <label className="mb-2 text-gray-600 font-medium">Last Name*</label>
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
              <label className="mb-2 text-gray-600 font-medium">Birthday*</label>
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
              <label className="mb-2 text-gray-600 font-medium">Gender*</label>
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
              <label className="mb-2 text-gray-600 font-medium">Email*</label>
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

            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-gray-600 font-medium">Phone*</label>
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
            <div className="flex flex-col">
              <label className="mb-2 text-gray-600 font-medium">School Name*</label>
              <input
                type="text"
                name="SchoolName"
                placeholder="e.g., PICT"
                className="p-3 border border-gray-300 rounded-lg w-full"
                value={formData.SchoolName}
                onChange={handleInputChange}
              />
                {errors.SchoolName && <p className="text-red-500 text-sm">{errors.SchoolName}</p>}
            </div>
          </div>

          {/* Marks and Board */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-2 text-gray-600 font-medium">Marks*</label>
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
              <label className="mb-2 text-gray-600 font-medium">Board*</label>
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
            className="w-full p-3 bg-orange-500 text-white font-bold mt-5 rounded-lg hover:bg-orange-600 transition duration-300"
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
