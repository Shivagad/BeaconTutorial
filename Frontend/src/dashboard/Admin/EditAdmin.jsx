import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";

const EditAdminModal = ({ isEditOpen, onClose, setToast, id }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Fetch admin details by id when the modal opens.
  const fetchAdminDetails = async () => {
    try {
      const response = await axios.get(`https://beacon-tutorial.vercel.app/server/dashadmin/${id}`);
      // Assuming the returned data has the fields 'name' and 'email'
      const data = response.data;
      setFormData({
        name: data.name || "",
        email: data.email || "",
        password: "" // Do not prefill password; user can enter a new one if needed.
      });
    } catch (error) {
      console.error("Error fetching admin details:", error);
    }
  };

  useEffect(() => {
    if (isEditOpen && id) {
      fetchAdminDetails();
    }
  }, [isEditOpen, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Prepare the update data. Only include password if a new one was entered.
      const updateData = {
        name: formData.name,
        email: formData.email,
      };
      if (formData.password) {
        updateData.password = formData.password;
      }
      const response = await axios.put(`https://beacon-tutorial.vercel.app/server/dashadmin/${id}`, updateData);
      if (response.data && response.data.message === "Admin updated successfully") {
        setToast({ success: true, message: "Admin updated successfully" });
      } else {
        setToast({ success: false, message: "Error updating admin" });
      }
    } catch (error) {
      setToast({ success: false, message: "Error updating admin" });
    }
    setIsSubmitting(false);
    onClose();
  };

  return isEditOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 mt-55 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Admin</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Admin Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Admin Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Leave blank to keep current password"
                  />
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
              {isSubmitting ? "Submitting..." : "Update Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default EditAdminModal;
