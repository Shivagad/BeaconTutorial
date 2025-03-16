import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";

const EditTestimonialModal = ({ isEditOpen, onClose, setToast, id }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    tag: "",
    seqno: "",
    description: "",
    youtubeVideoLink: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const response = await axios.put(
        `https://beacon-tutorial.vercel.app/server/testimonial/${id}`,
        formData
      );
      if (response.data) {
        setToast({ success: true, message: "Testimonial updated successfully" });
      } else {
        setToast({ success: false, message: "Error updating testimonial" });
      }
    } catch (error) {
      setToast({ success: false, message: "Error updating testimonial" });
    }
    setIsSubmitting(false);
    onClose();
  };

  const fetchTestimonialDetails = async () => {
    try {
      const response = await axios.get(
        `https://beacon-tutorial.vercel.app/server/testimonial/${id}`
      );
      const data = response.data.data;
      setFormData({
        name: data.name || "",
        tag: data.tag || "",
        seqno: data.seqno || "",
        description: data.description || "",
        youtubeVideoLink: data.youtubeVideoLink || "",
      });
    } catch (error) {
      console.error("Error fetching testimonial details:", error);
    }
  };

  useEffect(() => {
    if (isEditOpen && id) {
      fetchTestimonialDetails();
    }
  }, [isEditOpen, id]);

  return isEditOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 mt-55 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Testimonial</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sequence Number</label>
              <input
                type="number"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={formData.seqno}
                onChange={(e) => setFormData({ ...formData, seqno: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Video Link</label>
              <input
                type="url"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={formData.youtubeVideoLink}
                onChange={(e) => setFormData({ ...formData, youtubeVideoLink: e.target.value })}
              />
            </div>
          </div>
          <div className="border-t pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {isSubmitting ? "Submitting..." : "Update Testimonial"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default EditTestimonialModal;
