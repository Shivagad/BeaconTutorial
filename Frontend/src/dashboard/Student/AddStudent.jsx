import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";

const AddStudentModal = ({ isOpen, onClose, setToast }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    rollNo:"",
    fatherName: "",
    motherName: "",
    parentEmail: "",
    email: "",
    mobile: "",
    fatherMobile: "",
    address: "",
    state: "",
    city: "",
    gender: "",
    dob: "",
    admissionYear: "",
    course: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        rollNo:"",
        fatherName: "",
        motherName: "",
        parentEmail: "",
        email: "",
        mobile: "",
        fatherMobile: "",
        address: "",
        state: "",
        city: "",
        gender: "",
        dob: "",
        admissionYear: "",
        course: "",
        password: "",
      });
      setErrors({}); // Reset errors when modal opens

      axios
        .get("https://beacon-tutorial.vercel.app/server/courses/getall/")
        .then((response) => {
          // console.log("Courses API Response:", response.data.courses);
          setCourses(response.data.courses);
        })
        .catch((error) => console.error("Error fetching courses:", error));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    let newErrors = {};

    if (!formData.rollNo.trim()) {
      newErrors.rollNo = "Roll No is required";
    }
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.fatherName.trim()) {
      newErrors.fatherName = "Father's name is required";
    }
    if (!formData.motherName.trim()) {
      newErrors.motherName = "Mother's name is required";
    }
    if (!formData.parentEmail.trim() || !/\S+@\S+\.\S+/.test(formData.parentEmail)) {
      newErrors.parentEmail = "Valid parent email is required";
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits";
    }
    if (!formData.fatherMobile.trim() || !/^\d{10}$/.test(formData.fatherMobile)) {
      newErrors.fatherMobile = "Father's mobile must be exactly 10 digits";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.gender.trim()) {
      newErrors.gender = "Gender is required";
    }
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }
    if (!formData.admissionYear.toString().trim() || isNaN(formData.admissionYear)) {
      newErrors.admissionYear = "Admission year is required and must be a number";
    }
    if (!formData.course) {
      newErrors.course = "Please select a course";
    }
    if (!formData.password.trim() || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop submission if validation fails

    setIsSubmitting(true);
    const selectedCourse = courses.find((course) => course._id === formData.course);

    try {
      const response = await axios.post("https://beacon-tutorial.vercel.app/server/student/createstu/", {
        ...formData,
        course: selectedCourse ? selectedCourse.name : "",
      });

      if (response.data.success) {
        setToast({ success: true, message: "Student added successfully" });
        setFormData({
          name: "",
          rollNo:"",
          fatherName: "",
          motherName: "",
          parentEmail: "",
          email: "",
          mobile: "",
          fatherMobile: "",
          address: "",
          state: "",
          city: "",
          gender: "",
          dob: "",
          admissionYear: "",
          course: "",
          password: "",
        });
        setErrors({});
        onClose();
      } else {
        setToast({ success: false, message: response.data.message || "Error adding student" });
      }
    } catch (error) {
      setToast({ success: false, message: "Error adding student" });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
    <div className="bg-white rounded-lg p-6 w-full max-w-3xl border border-gray-200 max-h-screen overflow-y-auto animate-slideDown">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Student</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Roll No</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.rollNo}
              onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
            />
            {errors.rollNo && <p className="text-red-500 text-sm">{errors.rollNo}</p>}
          </div>

          {/* Father's Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Father's Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.fatherName}
              onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
            />
            {errors.fatherName && <p className="text-red-500 text-sm">{errors.fatherName}</p>}
          </div>

          {/* Mother's Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mother's Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.motherName}
              onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
            />
            {errors.motherName && <p className="text-red-500 text-sm">{errors.motherName}</p>}
          </div>

          {/* Parent Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Parent Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.parentEmail}
              onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
            />
            {errors.parentEmail && <p className="text-red-500 text-sm">{errors.parentEmail}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
          </div>

          {/* Father's Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Father's Mobile</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.fatherMobile}
              onChange={(e) => setFormData({ ...formData, fatherMobile: e.target.value })}
            />
            {errors.fatherMobile && <p className="text-red-500 text-sm">{errors.fatherMobile}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>
          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            />
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </div>

          {/* Admission Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Admission Year</label>
            <input
              type="number"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.admissionYear}
              onChange={(e) => setFormData({ ...formData, admissionYear: e.target.value })}
            />
            {errors.admissionYear && <p className="text-red-500 text-sm">{errors.admissionYear}</p>}
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Course</label>
            <select
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            >
              <option value="">Select a Course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
            {errors.course && <p className="text-red-500 text-sm">{errors.course}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <div className="border-t pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {isSubmitting ? "Submitting..." : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
