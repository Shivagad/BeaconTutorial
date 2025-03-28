import React, { useState, useRef } from "react";
import { X, Upload } from "lucide-react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddBlogModal = ({ isOpen, onClose, setToast, onSubmit }) => {
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    imagePath: [],
  });

  const [previewImage, setPreviewImage] = useState("");

  if (!isOpen) return null;

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    // Use formData.images (not imagePath) for counting
    if (files.length + formData.imagePath.length > 10) {
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
      setFormData((prev) => ({ ...prev, imagePath: [...prev.imagePath, ...newImages] }));
      setErrors((prev) => ({ ...prev, imagePath: null }));
    } catch (error) {
      setToast({ success: false, message: "Error processing images." });
    }
  };

  const removeImage = (index, event) => {
    event.preventDefault(); // Prevents form submission
    setFormData((prev) => ({
      ...prev,
      imagePath: prev.imagePath.filter((_, i) => i !== index),
    }));
  };


  const validateForm = () => {
    let newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Blog Name is required.";
    if (!formData.author) newErrors.author = "Author is requires.";
    if (!formData.content) newErrors.content = "Content is rquired";
    if (formData.imagePath.length === 0) newErrors.imagePath = "At least one image is required.";
    // if (!formData.description.trim()) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const dataToSend = {
      title: formData.title,
      author: formData.author,
      content: formData.content,
      imagePath: formData.imagePath.map((img) => img.base64), // only send the base64 strings
    };

    // console.log(dataToSend);


    try {
      setIsSubmitting(true);
      const response = await axios.post("https://beacon-tutorial.vercel.app/server/blog/create", dataToSend);
      if (response.data.success) {
        setToast({ success: true, message: "Blog added successfully" });
      } else {
        setToast({ success: false, message: "Error adding blog" });
      }

      // Reset form state including the image
      setFormData({ title: "", author: "", content: "", imagePath: [] });
    } catch (error) {
      setToast({ success: false, message: "Error adding blog" });
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg mt-80 p-6 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Blog</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.author}
              onChange={e => setFormData({ ...formData, author: e.target.value })}
            />
            {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <ReactQuill
              value={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              theme="snow"
              placeholder="Write your blog content here..."
            />

            {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Photos (Max: 10)
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
            {errors.imagePath && <p className="text-red-500 text-sm">{errors.imagePath}</p>}
          </div>

          <div className="space-y-2">
            {formData.imagePath.length > 0 && (
              <div className="border rounded-lg p-3 bg-gray-100 max-h-64 overflow-y-auto">
                {formData.imagePath.map((img, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between relative p-2 bg-white rounded-md shadow-sm"
                  >
                    <span className="truncate w-40">{img.name}</span>
                    <button onClick={(e) => removeImage(index, e)} className="absolute top-0 right-0">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {isSubmitting ? "Submitting..." : "Add Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogModal;