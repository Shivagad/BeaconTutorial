import React, { useState, useRef, useEffect } from "react";
import { X, Upload } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../Context/AuthProvider";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const EditBlogModal = ({ isOpen, onClose, setToast, blogId }) => {
  const { currentUser } = useAuth();
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    imagePath: [],
  });
  const [previewImage, setPreviewImage] = useState("");

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
    if (files.length + formData.imagePath.length > 10) {
      setToast({ success: false, message: "You can upload a maximum of 10 images." });
      return;
    }

    try {
      const newImages = await Promise.all(files.map(file => convertToBase64(file)));
      setFormData((prev) => ({
        ...prev,
        imagePath: [...prev.imagePath, ...newImages],
      }));
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
    // console.log(formData);

    const dataToSend = {
      title: formData.title,
      author: formData.author,
      content: formData.content,
      imagePath: formData.imagePath
    };

    setIsSubmitting(true);
    try {
      const response = await axios.put(`https://beacon-tutorial.vercel.app/server/blog/update/${blogId}`, dataToSend);

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
      const response = await axios.get(`https://beacon-tutorial.vercel.app/server/blog/${blogId}`);
      const data = response.data.data;
      // console.log(data)
      setFormData({
        title: data.title || "",
        content: data.content || "",
        author: data.author || "",
        imagePath: data.imagePath || []
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
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

          <label className="block font-semibold">Content</label>
          {/* <textarea
            placeholder="Content"
            className="w-full px-4 py-2 border rounded-lg h-32"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
          /> */}
          <div
            contentEditable
            className="border p-2 rounded-lg"
            dangerouslySetInnerHTML={{ __html: formData.content }}
            onInput={(e) =>
              setFormData({ ...formData, content: e.currentTarget.innerHTML })
            }
          ></div>

          {/* <ReactQuill
            value={formData.content}
            onChange={(content) => setFormData({ ...formData, content })}
            theme="snow"
            placeholder="Write your blog content here..."
          /> */}
          {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}

          <label className="block font-semibold">Author</label>
          <input
            type="text"
            placeholder="Author"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.author}
            // onChange={(author) => setFormData({ ...formData, author })}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />
          {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
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
          <div className="space-y-2">
            {formData.imagePath.length > 0 && (
              <div className="border rounded-lg p-3 bg-gray-100 max-h-64 overflow-y-auto">
                {formData.imagePath.map((img, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between relative p-2 bg-white rounded-md shadow-sm"
                  >
                    <span className="truncate w-40">
                      {typeof img === "string" ? `Image ${index + 1}` : img.name}
                    </span>
                    <button onClick={(e) => removeImage(index, e)} className="absolute top-0 right-0">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
