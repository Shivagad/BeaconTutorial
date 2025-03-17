import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const DeleteResultModal = ({ isOpen, onClose, setToast }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    examName: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:4000/server/student/resultdeletebyemail", formData);
      if (response.data.success) {
        setToast({ success: true, message: "Result deleted successfully" });
        setFormData({
          studentName: "",
          studentEmail: "",
          examName: "",
        });
        onClose();
      } else {
        setToast({ success: false, message: response.data.message || "Error deleting result" });
      }
    } catch (error) {
      setToast({ success: false, message: "Error deleting result" });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl border border-gray-200 animate-slideDown">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Delete Student Result</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Student Name</label>
            <input
              type="text"
              name="studentName"
              required
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="studentEmail"
              required
              value={formData.studentEmail}
              onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Exam Name</label>
            <input
              type="text"
              name="examName"
              required
              value={formData.examName}
              onChange={(e) => setFormData({ ...formData, examName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>


          <div className="border-t pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              {isSubmitting ? "Deleting..." : "Delete Result"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteResultModal;
