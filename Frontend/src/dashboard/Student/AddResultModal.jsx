import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const AddStudentResult = ({ isOpen, onClose, setToast }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    studentEmail: "",
    exam: "",
    examDate: "",
    totalMarks: "",
    rank: "",
    outof:"",
    correctAnswers: "",
    incorrectAnswers: "",
    notAttempted: "",
    physics: "",
    physicsSectionA: "",
    physicsSectionB: "",
    chemistry: "",
    chemistrySectionA: "",
    chemistrySectionB: "",
    maths: "",
    mathsSectionA: "",
    mathsSectionB: "",
    biology: "",
    biologySectionA: "",
    biologySectionB: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:4000/server/student/add", formData);
      console.log(response);
      if (response.data.success) {
        setToast({ success: true, message: "Result added successfully" });
        setFormData({
          studentEmail: "",
          exam: "",
          outof:"",
          examDate: "",
          totalMarks: "",
          rank: "",
          correctAnswers: "",
          incorrectAnswers: "",
          notAttempted: "",
          physics: "",
          physicsSectionA: "",
          physicsSectionB: "",
          chemistry: "",
          chemistrySectionA: "",
          chemistrySectionB: "",
          maths: "",
          mathsSectionA: "",
          mathsSectionB: "",
          biology: "",
          biologySectionA: "",
          biologySectionB: "",
        });
        onClose();
      } else {
        setToast({ success: false, message: response.data.message || "Error adding result" });
      }
    } catch (error) {
      setToast({ success: false, message: "Error adding result" });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl border border-gray-200 max-h-screen overflow-y-auto animate-slideDown">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Add Student Result</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700">{key}</label>
              <input
                type={
                  key === "studentEmail"
                    ? "email"
                    : key === "examDate"
                    ? "date"
                    : "text"
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={formData[key]}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
              />
            </div>
          ))}

          <div className="border-t pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {isSubmitting ? "Submitting..." : "Add Result"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentResult;
