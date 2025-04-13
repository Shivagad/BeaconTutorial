import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const AddAdModal = ({ isOpen, onClose, setToast }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    videoLink: "", // For YouTube video link
  });

  if (!isOpen) return null;

  const validateInputs = () => {
    let newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.videoLink.trim()) newErrors.videoLink = "YouTube video link is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      setIsSubmitting(true);
      const response = await axios.post("http://localhost:4000/server/ads/add", {
        title: formData.title,
        videoLink: formData.videoLink,
      });

      setFormData({ title: "", videoLink: "" });
      setToast({
        success: response.data.success,
        message: response.data.message,
      });

      onClose();
    } catch (error) {
      setToast({
        success: false,
        message: error.response?.data?.message || "Error adding ad",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Ad</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg ${errors.title ? "border-red-500" : ""}`}
              placeholder="Enter Ad Title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">YouTube Video Link</label>
            <input
              type="text"
              value={formData.videoLink}
              onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg ${errors.videoLink ? "border-red-500" : ""}`}
              placeholder="Enter YouTube Video Link"
            />
            {errors.videoLink && <p className="text-red-500 text-sm mt-1">{errors.videoLink}</p>}
          </div>

          <div className="border-t pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700"
            >
              {isSubmitting ? "Adding..." : "Add Ad"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdModal;
