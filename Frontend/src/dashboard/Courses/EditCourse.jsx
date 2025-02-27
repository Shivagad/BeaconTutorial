// EditCourseModal.jsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";

const EditCourseModal = ({ isEditOpen, onClose, setToast, id }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
  });

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/server/courses/getid/${id}`);
      if (response.data.success) {
        setFormData({
          name: response.data.course.name || "",
          code: response.data.course.code || "",
        });
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  useEffect(() => {
    if (isEditOpen && id) fetchCourseDetails();
  }, [isEditOpen, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.put(`http://localhost:4000/server/courses/change/${id}`, formData);
      setToast({ success: response.data.success, message: response.data.message });
    } catch (error) {
      setToast({ success: false, message: "Error updating course" });
    }
    setIsSubmitting(false);
    onClose();
  };

  return isEditOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Course</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg">
            {isSubmitting ? "Submitting..." : "Update Course"}
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default EditCourseModal;
