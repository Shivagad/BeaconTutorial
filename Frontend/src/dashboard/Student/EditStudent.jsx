import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";

const EditStudentModal = ({ isEditOpen, onClose, setToast, studentId }) => {
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

  // Fetch available courses
  useEffect(() => {
    axios
      .get("https://beacon-tutorial.vercel.app/server/courses/getall/")
      .then((response) => {
        console.log("Courses API Response:", response.data.courses);
        setCourses(response.data.courses);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  // Fetch student details when studentId changes
  useEffect(() => {
    if (studentId) {
      axios
        .get(`https://beacon-tutorial.vercel.app/server/student/byid/${studentId}`)
        .then((response) => {
          console.log("Student API Response:", response.data);
          const student = response.data;
          setFormData({
            name: student.name || "",
            rollNo: student.rollNo || "",
            fatherName: student.fatherName || "",
            motherName: student.motherName || "",
            parentEmail: student.parentEmail || "",
            email: student.email || "",
            mobile: student.mobile || "",
            fatherMobile: student.fatherMobile || "",
            address: student.address || "",
            state: student.state || "",
            city: student.city || "",
            gender: student.gender || "",
            // Convert date to YYYY-MM-DD format for date input
            dob: student.dob ? new Date(student.dob).toISOString().slice(0, 10) : "",
            admissionYear: student.admissionYear || "",
            course: student.course?._id || "",
            password: "", // leave empty so that password is updated only if provided
          });
        })
        .catch((error) => {
          console.error("Error fetching student details:", error);
        });
    }
  }, [studentId]);

  if (!isEditOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare update payload. If password is blank, remove it from payload.
    const payload = { ...formData };
    if (!payload.password.trim()) {
      delete payload.password;
    }

    try {
      const response = await axios.put(
        `https://beacon-tutorial.vercel.app/server/student/stu/${studentId}`,
        payload
      );

      if (response.data.success) {
        setToast({ success: true, message: "Student updated successfully" });
      } else {
        setToast({ success: false, message: "Error updating student" });
      }
    } catch (error) {
      setToast({ success: false, message: "Error updating student" });
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
    <div className="bg-white rounded-lg p-6 w-full max-w-3xl border border-gray-200 max-h-screen overflow-y-auto animate-slideDown">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Student</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
          </div>

          {/* Password (optional - only update if provided) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password (leave blank to keep unchanged)
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="border-t pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {isSubmitting ? "Updating..." : "Update Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;
