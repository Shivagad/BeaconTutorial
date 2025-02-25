import React, { useState, useRef } from "react";
import { X, Upload } from "lucide-react";
import axios from "axios";

const AddPosterModal = ({ isOpen, onClose, setToast, onSubmit }) => {
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    seqno: "",
    imagePath: "",
  });

  const [previewImage, setPreviewImage] = useState("");

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setPreviewImage(result);
        setFormData({ ...formData, imagePath: result });
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
      const response = await axios.post("http://localhost:4000/server/poster/addposter", formData);

      if (response.data.success) {
        setToast({
          success: true,
          message: "Poster added successfully",
        });
      } else {
        setToast({
          success: false,
          message: "Error Adding Poster",
        });
      }
    } catch (error) {
      setToast({
        success: false,
        message: "Error Adding Poster",
      });
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 mt-60 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Poster</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Poster Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Poster Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Poster Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sequence Number</label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={formData.seqno}
                    onChange={(e) => setFormData({ ...formData, seqno: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Poster Image</label>
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
                        <span className="text-sm">Upload Image</span>
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
            </div>
          </div>

          <div className="border-t pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {isSubmitting ? "Submitting..." : "Add Poster"}
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default AddPosterModal;
