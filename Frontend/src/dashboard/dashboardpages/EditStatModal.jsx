import React, { useState, useEffect } from "react";
import axios from "axios";

const EditStatModal = ({ isOpen, onClose, setToast }) => {
  const [formData, setFormData] = useState({
    studentsCount: "",
    expertFacultyCount: "",
    successRate: "",
    yearsOfExperience: "",
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("https://beacon-tutorial.vercel.app/server/stat/getstat");
        // console.log(response.data);
        if (response.data) {
          setFormData(response.data); // Assuming you only have one stat entry, hence [0]
        }
      } catch (error) {
        console.error("Failed to fetch statistics.", error);
      }
    };

    if (isOpen) {
      fetchStats();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("https://beacon-tutorial.vercel.app/server/stat/updatestat", formData);
      if (response.data) {
        setToast({ success: true, message: "Statistics updated successfully!" });
        onClose();
      }
    } catch (error) {
      setToast({ success: false, message: "Failed to update statistics." });
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold mb-4">Edit Statistics</h2>
        <form onSubmit={handleSubmit}>
          {["studentsCount", "expertFacultyCount", "successRate", "yearsOfExperience"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm font-medium mb-1">{field.replace(/([A-Z])/g, " $1")}</label>
              <input
                type="number"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          ))}

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStatModal;
