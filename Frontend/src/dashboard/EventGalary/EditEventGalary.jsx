import React, { useState, useRef, useEffect } from "react";
import { X, Upload } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../Context/AuthProvider";

const EditEventGallery = ({ isEditOpen, onClose, setToast2, id }) => {
  const { currentUser } = useAuth();
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Our state uses "images" to store both existing URLs (strings) and new images (objects)
  const [formData, setFormData] = useState({
    eventName: "",
    year: "",
    images: [], // Array of images (either URL string or { name, base64 } object)
    description: "",
  });

  // Fetch event details when the modal opens.
  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`https://beacon-tutorial.vercel.app/server/event/geteventbyid/${id}`);
      const data = response.data.data;
      console.log(data);
      setFormData({
        eventName: data.eventName || "",
        year: data.year || "",
        // Assuming your API returns existing images as an array of URLs in data.imagesPath.
        images: data.imagesPath || [],
        description: data.description || "",
      });
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  useEffect(() => {
    if (isEditOpen && id) {
      fetchEventDetails();
    }
  }, [isEditOpen, id]);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.eventName.trim()) newErrors.eventName = "Event Name is required.";
    if (!formData.year) newErrors.year = "Please select a year.";
    if (formData.images.length === 0) newErrors.images = "At least one image is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    return Object.keys(newErrors).length === 0;
  };

  // Convert a file to a Base64 string and return an object { name, base64 }
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve({ name: file.name, base64: reader.result });
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    // Check count using formData.images (which may contain both strings and objects)
    if (files.length + formData.images.length > 10) {
      setToast2({ success: false, message: "You can upload a maximum of 10 images." });
      return;
    }

    try {
      const newImages = await Promise.all(files.map(file => convertToBase64(file)));
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    } catch (error) {
      setToast2({ success: false, message: "Error processing images." });
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
    console.log(formData);
    setIsSubmitting(true);
    try {
      const dataToSend = {
        eventName: formData.eventName,
        year: formData.year,
        description: formData.description,
        // Send images as they are. Backend should distinguish between URL strings and new images (objects with base64).
        imagesPath: formData.images,
      };
      const response = await axios.put(
        `https://beacon-tutorial.vercel.app/server/event/editevent/${id}`,
        dataToSend,
        { headers: { "Content-Type": "application/json" } }
      );
      setFormData({
        eventName: "",
        year: "",
        images: [],
        description: "",
      });
      if (response.data.success) {
        setToast2({ success: true, message: "Event updated successfully" });
      } else {
        setToast2({ success: false, message: "Error updating event" });
      }
    } catch (error) {
      setToast2({ success: false, message: "Error updating event" });
    }
    setIsSubmitting(false);
    onClose();
  };

  return isEditOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 mt-20 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Event</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Left Side: Form Inputs */}
          <div className="space-y-4">
            {/* Event Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.eventName}
                onChange={(e) =>
                  setFormData({ ...formData, eventName: e.target.value })
                }
              />
            </div>
            {/* Year Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <select
                required
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
              >
                <option value="">Select Year</option>
                {Array.from({ length: new Date().getFullYear() - 1999 }, (_, i) => (
                  <option key={i} value={2000 + i}>
                    {2000 + i}
                  </option>
                ))}
              </select>
            </div>
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                required
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
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
                    <span className="truncate w-40">
                      {typeof img === "string" ? `Image ${index + 1}` : img.name}
                    </span>
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Submit Button (spanning both columns) */}
          <div className="col-span-2 border-t pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {isSubmitting ? "Submitting..." : "Update Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default EditEventGallery;
