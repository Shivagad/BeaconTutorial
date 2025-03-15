import React, { useState, useRef } from "react";
import { X, Upload } from "lucide-react";
import axios from "axios";

const AddFacultyModal = ({ isOpen, onClose, setToast }) => {
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subjects: "",
    qualification: "",
    profileImage: "",
    bio: "",
    joiningDate: "",
  });

  const [previewImage, setPreviewImage] = useState("");

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateInputs = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email format";
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Phone must be 10 digits";
    if (!formData.subjects.trim()) newErrors.subjects = "Subjects are required";
    if (!formData.qualification.trim()) newErrors.qualification = "Qualification is required";
    if (!formData.joiningDate) newErrors.joiningDate = "Joining date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      setIsSubmitting(true);
      const response = await axios.post("https://beacon-tutorial.vercel.app/server/faculty/add", formData);

      setFormData({
        name: "",
        email: "",
        phone: "",
        subjects: "",
        qualification: "",
        profileImage: "",
        bio: "",
        joiningDate: "",
      });
      setPreviewImage("");

      setToast({
        success: response.data.success,
        message: response.data.success ? "Faculty added successfully" : "Error adding faculty",
      });
    } catch (error) {
      setToast({ success: false, message: "Error adding faculty" });
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Faculty</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Name", key: "name", type: "text", required: true },
              { label: "Email", key: "email", type: "email", required: true },
              { label: "Phone", key: "phone", type: "text", required: true },
              { label: "Subjects", key: "subjects", type: "text", required: true, placeholder: "Comma separated subjects" },
              { label: "Qualification", key: "qualification", type: "text", required: true },
              { label: "Joining Date", key: "joiningDate", type: "date", required: true },
            ].map(({ label, key, type, required, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  type={type}
                  required={required}
                  placeholder={placeholder}
                  className={`w-full px-4 py-2 border rounded-lg ${errors[key] ? "border-red-500" : ""}`}
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                />
                {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700">Bio (Optional)</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg h-24"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Write a short biography"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Image (Optional)</label>
              <div className="flex flex-col items-center space-y-4">
                {previewImage ? (
                  <div className="relative w-40 h-40">
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage("");
                        setFormData({ ...formData, profileImage: "" });
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
                    className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500"
                  >
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-sm">Upload Photo</span>
                  </button>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </div>
            </div>
          </div>
          <div className="border-t pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700"
            >
              {isSubmitting ? "Submitting..." : "Add Faculty"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFacultyModal;
