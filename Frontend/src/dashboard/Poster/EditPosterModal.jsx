import React, { useState, useRef, useEffect } from "react";
import { X, Upload } from "lucide-react";
import axios from "axios";

const EditPosterModal = ({ isEditOpen, onClose, setToast, id }) => {
  const fileInputRef = useRef(null);
  const mobileFileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    seqno: "",
    imagePath: "",
    mobileImagePath: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [previewMobileImage, setPreviewMobileImage] = useState(null);

  const handleImageChange = (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        if (type === "imagePath") {
          setPreviewImage(base64Image);
          setFormData((prev) => ({ ...prev, imagePath: base64Image }));
        } else {
          setPreviewMobileImage(base64Image);
          setFormData((prev) => ({ ...prev, mobileImagePath: base64Image }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.put(
        `https://beacon-tutorial.vercel.app/server/poster/editposter/${id}`,
        formData
      );
      if (response.data.success) {
        setToast({ success: true, message: "Poster updated successfully" });
      } else {
        setToast({ success: false, message: "Error updating poster" });
      }
    } catch (error) {
      setToast({ success: false, message: "Error updating poster" });
    }
    setIsSubmitting(false);
    onClose();
  };

  const fetchPosterDetails = async () => {
    try {
      const response = await axios.get(
        `https://beacon-tutorial.vercel.app/server/poster/getposter/${id}`
      );
      const data = response.data.data;
      setFormData({
        seqno: data.seqno || "",
        name: data.name || "",
        imagePath: data.imagePath || "",
        mobileImagePath: data.mobileImagePath || "",
      });
      setPreviewImage(data.imagePath || null);
      setPreviewMobileImage(data.mobileImagePath || null);
    } catch (error) {
      console.error("Error fetching poster details:", error);
    }
  };

  useEffect(() => {
    if (isEditOpen && id) {
      fetchPosterDetails();
    }
  }, [isEditOpen, id]);

  return isEditOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Poster</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="posterName"
              className="block text-sm font-medium text-gray-700"
            >
              Poster Name
            </label>
            <input
              id="posterName"
              type="text"
              required
              placeholder="Enter Poster Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label
              htmlFor="seqno"
              className="block text-sm font-medium text-gray-700"
            >
              Sequence Number
            </label>
            <input
              id="seqno"
              type="number"
              required
              placeholder="Enter Sequence Number"
              value={formData.seqno}
              onChange={(e) =>
                setFormData({ ...formData, seqno: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {["imagePath", "mobileImagePath"].map((type) => (
            <div key={type} className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                {type === "imagePath" ? "Desktop Image" : "Mobile Image"}
              </label>
              <div className="flex flex-col items-center space-y-4">
                {(type === "imagePath" ? previewImage : previewMobileImage) ? (
                  <div className="relative w-40 h-40">
                    <img
                      src={
                        type === "imagePath" ? previewImage : previewMobileImage
                      }
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (type === "imagePath") {
                          setPreviewImage(null);
                          setFormData((prev) => ({ ...prev, imagePath: "" }));
                        } else {
                          setPreviewMobileImage(null);
                          setFormData((prev) => ({
                            ...prev,
                            mobileImagePath: "",
                          }));
                        }
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      type === "imagePath"
                        ? fileInputRef.current?.click()
                        : mobileFileInputRef.current?.click()
                    }
                    className="w-40 h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500"
                  >
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-sm">Upload Image</span>
                  </button>
                )}
                <input
                  ref={type === "imagePath" ? fileInputRef : mobileFileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, type)}
                />
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700"
          >
            {isSubmitting ? "Submitting..." : "Update Poster"}
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default EditPosterModal;
