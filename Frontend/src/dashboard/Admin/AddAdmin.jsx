import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const AddAdminModal = ({ isOpen, onClose, setToast, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  if (!isOpen) return null;

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      console.log(formData);
      const response = await axios.post('https://beacon-tutorial.vercel.app/server/dashadmin/', formData);
if (response.data.message === "Admin created successfully") {
  setToast({
    success: true,
    message: "Admin added successfully"
  });
  setFormData({
    name: "",
    email: "",
    password: ""
  });
} else {
  setToast({
    success: false,
    message: "Error Adding Admin"
  });
}

    } catch (error) {
      setToast({
        success: false,
        message: "Error Adding Admin"
      });
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 mt-50 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Admin</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Admin Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={formData.password}
                  onChange={e =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {isSubmitting ? "Submitting..." : "Add Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdminModal;
