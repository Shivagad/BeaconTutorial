import React, { useState, useRef, useEffect } from "react";
import { X, Upload } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../Context/AuthProvider";

const EditBlogModal = ({ isOpen, onClose, setToast, blogId }) => {
  const { currentUser } = useAuth();
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    imagePath: ""
  });
  const [previewImage, setPreviewImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setPreviewImage(result);
        setFormData((prev) => ({ ...prev, imagePath: result }));
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

    if (!formData.title || !formData.content || !formData.author) {
      setToast({ success: false, message: "Title, content, and author are required." });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.put(`http://localhost:4000/server/blog/update/${blogId}`, formData);

      if (response.data.success) {
        setToast({ success: true, message: "Blog updated successfully" });
      } else {
        setToast({ success: false, message: "Error updating blog" });
      }
    } catch (error) {
      setToast({ success: false, message: "Error updating blog" });
    }
    setIsSubmitting(false);
    onClose();
  };

  const fetchBlogDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/server/blog/${blogId}`);
      const data = response.data.data;
      console.log(data)
      setFormData({
        title: data.title || "",
        content: data.content || "",
        author: data.author || "",
        imagePath: data.imagepath || ""
      });
      if (data.imagepath) {
        setPreviewImage(data.imagepath);
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };

  useEffect(() => {
    if (isOpen && blogId) {
      fetchBlogDetails();
    }
  }, [isOpen, blogId]);

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg mt-80 p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Blog</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <label className="block font-semibold">Content</label>
          <textarea
            placeholder="Content"
            className="w-full px-4 py-2 border rounded-lg h-32"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
          />

          <label className="block font-semibold">Author</label>
          <input
            type="text"
            placeholder="Author"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />

          <div className="flex flex-col items-center space-y-4">
            <label className="block font-semibold">Image</label>
            {previewImage ? (
              <div className="relative w-40 h-40">
                <img src={previewImage} alt="Preview" className="w-full h-full object-cover rounded-lg" />
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isSubmitting ? "Updating..." : "Update Blog"}
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default EditBlogModal;
