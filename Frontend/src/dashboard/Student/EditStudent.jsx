import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";

const EditStudentModal = ({ isEditOpen, onClose, setToast, studentId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState([]); // Store available courses
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "", // Store the course ID
  });

  // Fetch available courses
  useEffect(() => {
    axios
      .get("http://localhost:4000/server/courses/getall/")
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
        .get(`http://localhost:4000/server/student/byid/${studentId}`)
        .then((response) => {
          console.log("Student API Response:", response.data);
          setFormData({
            name: response.data.name,
            email: response.data.email,
            mobile: response.data.mobile,
            course: response.data.course._id, // Use course ID
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

    try {
      const response = await axios.put(
        `http://localhost:4000/server/student/stu/${studentId}`,
        formData
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
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Student</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

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
