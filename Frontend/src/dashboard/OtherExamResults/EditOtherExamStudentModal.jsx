import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";

const EditOtherExamModal = ({ isEditOpen, onClose, setToast, id }) => {
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    imagePath: "",
    ExamName: "",
    seqno: "",
    Tag: "",
  });
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`https://beacon-tutorial.vercel.app/server/other-exam-results/${id}`)
        .then((response) => {
          const result = response.data.data;
          setFormData({
            firstName: result.firstName || "",
            lastName: result.lastName || "",
            imagePath: result.imagePath || "",
            ExamName: result.ExamName || "",
            seqno: result.seqno || "",
            Tag: result.Tag || "",
          });
          if (result.imagePath) {
            setPreviewImage(result.imagePath);
          }
        })
        .catch((error) => {
          console.error("Error fetching exam result details:", error);
        });
    }
  }, [id]);

  if (!isEditOpen) return null;

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

  const removeImage = () => {
    setPreviewImage("");
    setFormData((prev) => ({ ...prev, imagePath: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.put(
        `https://beacon-tutorial.vercel.app/server/other-exam-results/${id}`,
        formData
      );

      if (response.data.success) {
        setToast({ success: true, message: "Exam result updated successfully" });
      } else {
        setToast({ success: false, message: "Error updating exam result" });
      }
    } catch (error) {
      setToast({ success: false, message: "Error updating exam result" });
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl border border-gray-200 max-h-screen overflow-y-auto animate-slideDown">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Other Exam Results</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Student Photo</label>
            <div className="flex flex-col items-center space-y-4 relative">
              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-lg border cursor-pointer"
                    onClick={() => fileInputRef.current.click()}
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    onClick={removeImage}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="border-dashed border-2 border-gray-300 p-10 text-gray-500 rounded-lg"
                  onClick={() => fileInputRef.current.click()}
                >
                  Upload Image
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Exam Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.ExamName}
              onChange={(e) => setFormData({ ...formData, ExamName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sequence Number</label>
            <input
              type="number"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.seqno}
              onChange={(e) => setFormData({ ...formData, seqno: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Tag</label>
            <input
              type="text"
             
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.Tag}
              onChange={(e) => setFormData({ ...formData, Tag: e.target.value })}
            />
          </div>


          <div className="border-t pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {isSubmitting ? "Updating..." : "Update Exam Result"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOtherExamModal;