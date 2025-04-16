import React, { useState, useRef } from "react";
import axios from "axios";

const AddAdModal = ({ isOpen, onClose, setToast }) => {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    if (!file) {
      setError("Please select a video file.");
      return false;
    }
    setError("");
    return true;
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("video", file);


    try {
      setLoading(true);
      const res = await axios.post("https://beacon-tutorial.vercel.app/server/ads/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setToast({ success: true, message: res.data.message });
      setFile(null);
      onClose();
    } catch (err) {
      setToast({
        success: false,
        message: err.response?.data || "Upload failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <form onSubmit={handleUpload} className="bg-white p-6 rounded w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Upload Video</h2>

        <div>
          {file ? (
            <div className="flex items-center justify-between border p-2 rounded">
              <span className="truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-red-500"
              >
                X
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current.click()}
              className="w-full py-2 border-2 border-dashed text-gray-500 rounded hover:border-blue-500"
            >
              Select Video
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0])}
            className="hidden"
          />
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full mt-2 text-sm text-gray-600 underline"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddAdModal;
