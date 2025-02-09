import React, { useState, useRef, useEffect } from "react";
import { X, Upload } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../Context/AuthProvider";

const EditCETStudentModal = ({ isEditOpen, onClose, setToast2, id }) => {
  const { currentUser } = useAuth();
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    percentage: "",
    seqno: "",
    imagePath: "",
    chemistryMarks: "",
    physicsMarks: "",
    mathMarks: "",
    biologyMarks: "",
    Tag: ""
  });
  const [previewImage, setPreviewImage] = useState("");

  // Handle image changes: read file as base64 and update state.
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
      setToast2({
        success: false,
        message: "Please select an image.",
      });
      return;
    }
  
    setIsSubmitting(true);
    try {
      const response = await axios.put(
        `http://localhost:4000/server/cet/students/${id}`,
        formData
      );
      if (response.data.success) {
        setToast2({ success: true, message: "Student updated successfully" });
      } else {
        setToast2({ success: false, message: "Error updating student" });
      }
    } catch (error) {
      setToast2({ success: false, message: "Error updating student" });
    }
    setIsSubmitting(false);
    onClose();
  };
  
  // Fetch student details by id when the modal opens.
  const fetchAllDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/server/cet/students/${id}`);
      const data = response.data.data;
      setFormData({
        seqno: data.seqno || "",
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        percentage: data.percentage || "",
        imagePath: data.imagePath || "",
        mathMarks: data.mathMarks || "",
        physicsMarks: data.physicsMarks || "",
        chemistryMarks: data.chemistryMarks || "",
        biologyMarks: data.biologyMarks || "",
        Tag: data.Tag || "",
      });
      if (data.imagePath) {
        setPreviewImage(data.imagePath);
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  useEffect(() => {
    if (isEditOpen && id) {
      fetchAllDetails();
    }
  }, [isEditOpen, id]);

  return isEditOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 mt-80 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit CET Topper</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>
            </div>
            {/* Marks & Tags */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Marks & Tags</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Percentage</label>
                  <input
                    type="number"
                    step="any"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={formData.percentage}
                    onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg"
            >
              {isSubmitting ? "Submitting..." : "Update Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default EditCETStudentModal;
