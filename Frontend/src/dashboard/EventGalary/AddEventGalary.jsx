import React, { useState, useRef } from "react";
import { X, Upload } from "lucide-react";
import axios from "axios";

const AddEventGallery = ({ isOpen, onClose, setToast }) => {
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    eventName: "",
    year: "",
    images: [], // will store objects: { name, base64 }
    description: "",
  });

  if (!isOpen) return null;

  const validateForm = () => {
    let newErrors = {};
    if (!formData.eventName.trim()) newErrors.eventName = "Event Name is required.";
    if (!formData.year) newErrors.year = "Please select a year.";
    if (formData.images.length === 0) newErrors.images = "At least one image is required.";
    // if (!formData.description.trim()) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    // Use formData.images (not imagePath) for counting
    if (files.length + formData.images.length > 10) {
      setToast({ success: false, message: "You can upload a maximum of 10 images." });
      return;
    }

    // Function to convert file to Base64 string
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve({ name: file.name, base64: reader.result });
        reader.onerror = (error) => reject(error);
      });
    };

    try {
      const newImages = await Promise.all(files.map(file => convertToBase64(file)));
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
      setErrors((prev) => ({ ...prev, images: null }));
    } catch (error) {
      setToast({ success: false, message: "Error processing images." });
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Create data object that includes only the base64 image strings
    const dataToSend = {
      eventName: formData.eventName,
      year: formData.year,
      description: formData.description,
      imagesPath: formData.images.map((img) => img.base64), // only send the base64 strings
    };

    // console.log(dataToSend)

    try {
      const response = await axios.post("https://beacon-tutorial.vercel.app/server/event/addevent", dataToSend);

      if (response.data.success) {
        setToast({ success: true, message: "Event added successfully!" });
        setFormData({ eventName: "", year: "", images: [], description: "" });
        onClose();
      } else {
        setToast({ success: false, message: "Error adding event." });
      }
    } catch (error) {
      setToast({ success: false, message: "Server error. Try again later." });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 mt-10 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Event</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Left Side: Form Inputs */}
          <div className="space-y-4">
            {/* Event Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.eventName}
                onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
              />
              {errors.eventName && <p className="text-red-500 text-sm">{errors.eventName}</p>}
            </div>

            {/* Year Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              >
                <option value="">Select Year</option>
                {Array.from({ length: new Date().getFullYear() - 1999 }, (_, i) => (
                  <option key={i} value={2000 + i}>
                    {2000 + i}
                  </option>
                ))}
              </select>
              {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              {/* {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>} */}
            </div>

            {/* Image Upload Button */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Photos (Max: 10)
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Upload className="w-5 h-5 inline-block mr-2" /> Upload Photos
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
            </div>
          </div>

          {/* Right Side: Image Preview List */}
          <div className="space-y-2">
            {formData.images.length > 0 && (
              <div className="border rounded-lg p-3 bg-gray-100 max-h-64 overflow-y-auto">
                {formData.images.map((img, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between relative p-2 bg-white rounded-md shadow-sm"
                  >
                    <span className="truncate w-40">{img.name}</span>
                    <button onClick={() => removeImage(index)} className="absolute top-0 right-0">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button - Spanning Full Width */}
          <div className="col-span-2 border-t pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
              {isSubmitting ? "Submitting..." : "Add Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventGallery;
