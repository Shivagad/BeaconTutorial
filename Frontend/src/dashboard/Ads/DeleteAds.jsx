import React from "react";
import axios from "axios";
import { AlertTriangle, X } from "lucide-react";

const DeleteAdModal = ({ isOpen, onClose, setToast }) => {
  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      const res = await axios.delete("https://beacon-tutorial.vercel.app/server/ads/delete");
      
      // Check if the response has the expected structure
      if (res.data && typeof res.data === 'object') {
        // If response has success property, use it
        if ('success' in res.data) {
          setToast({ 
            success: res.data.success, 
            message: res.data.message || "Video deleted successfully" 
          });
        } else {
          // If the response doesn't have a success property but the request succeeded
          setToast({ 
            success: true, 
            message: res.data.message || "Video deleted successfully" 
          });
        }
      } else {
        // If response isn't what we expect but request succeeded
        setToast({ success: true, message: "Video deleted successfully" });
      }
      
      onClose();
    } catch (err) {
      console.error("Error deleting video:", err);
      
      // Extract error message from response if available
      const errorMessage = err.response?.data?.message || "Error deleting video";
      
      setToast({ success: false, message: errorMessage });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Confirm Delete</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertTriangle className="w-6 h-6" />
          <span>Are you sure you want to delete this video?</span>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAdModal;