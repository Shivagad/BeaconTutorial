import React, { useState, useRef } from "react";
import { X, Upload } from "lucide-react";
import axios from "axios";

const AddOtherExamStudentModal = ({ isOpen, onClose, setToast }) => {
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    ExamName: "",
    seqno: "",
    imagePath: "",
    Tag: "",
  });

  const [previewImage, setPreviewImage] = useState("");

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({ ...formData, imagePath: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!previewImage) {
      setToast({
        success: false,
        message: "Please select an image.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      console.log(formData);
      const response = await axios.post(
        "http://localhost:4000/server/exam/otherexam",
        formData
      );
     

      setFormData({
        firstName: "",
        lastName: "",
        ExamName: "",
        seqno: "",
        imagePath: "",
        Tag: "",
      });

      if (response.data.success) {
        setToast({ success: true, message: "Student added successfully" });
      } else {
        setToast({ success: false, message: "Error adding student" });
      }
    } catch (error) {
      setToast({ success: false, message: "Error adding student" });
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Student</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />

              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />

              <label className="block text-sm font-medium text-gray-700">Exam Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500"
                value={formData.ExamName}
                onChange={(e) => setFormData({ ...formData, ExamName: e.target.value })}
              />

              <label className="block text-sm font-medium text-gray-700">Sequence No</label>
              <input
                type="number"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500"
                value={formData.seqno}
                onChange={(e) => setFormData({ ...formData, seqno: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Tag</label>
              <input
                type="text"
               
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500"
                value={formData.Tag}
                onChange={(e) => setFormData({ ...formData, Tag: e.target.value })}
              />

              <label className="block text-sm font-medium text-gray-700">Student Photo</label>
              <div className="flex flex-col items-center space-y-4">
                {previewImage ? (
                  <div className="relative w-40 h-40">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage("");
                        setFormData({ ...formData, imagePath: "" });
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
                  >
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-sm">Upload Photo</span>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isSubmitting ? "Submitting..." : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOtherExamStudentModal;
