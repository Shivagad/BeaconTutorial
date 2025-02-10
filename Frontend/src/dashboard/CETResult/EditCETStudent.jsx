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
    imagePath: "",
    college: "",
    totalPercentile: "",
    mathematicsPercentile: "",
    physicsPercentile: "",
    chemistryPercentile: "",
    biologyPercentile: "",
    seqno: "",
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
        college: data.college || "",
        totalPercentile: data.totalPercentile || "",
        imagePath: data.imagePath || "",
        mathematicsPercentile: data.mathematicsPercentile || "",
        physicsPercentile: data.physicsPercentile || "",
        chemistryPercentile: data.chemistryPercentile || "",
        biologyPercentile: data.biologyPercentile || "",
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
             <h2 className="text-2xl font-bold text-gray-800">Add New CET Topper</h2>
             <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
               <X className="w-6 h-6" />
             </button>
           </div>
   
           <form onSubmit={handleSubmit} className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-6">
                 <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
                 <div className="space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                     <input
                       type="text"
                       required
                       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                       value={formData.firstName}
                       onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                     <input
                       type="text"
                       required
                       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                       value={formData.lastName}
                       onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Sequence Number
                     </label>
                     <input
                       type="number"
                       required
                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                       value={formData.seqno}
                       onChange={(e) =>
                         setFormData({ ...formData, seqno: e.target.value })
                       }
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Student Photo</label>
                     <div className="flex flex-col items-center space-y-4">
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
                           className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500"
                         >
                           <Upload className="w-8 h-8 mb-2" />
                           <span className="text-sm">Upload Photo</span>
                         </button>
                       )}
                       <input ref={fileInputRef} type="file" accept="image/*" className="hidden"  onChange={handleImageChange} />
                     </div>
                   </div>
                 </div>
               </div>
               <div className="space-y-6">
                 <h3 className="text-lg font-semibold text-gray-700 mb-4">
                   Marks & Tags
                 </h3>
                 <div className="space-y-4">
                 <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       College
                     </label>
                     <input
                       type="text"
                       step="any"
                       // required
                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                       value={formData.college}
                       onChange={e =>
                         setFormData({ ...formData, college: e.target.value })
                       }
                     />
                   </div>
                
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Total Percentile
                     </label>
                     <input
                       type="number"
                       step="any"
                       // required
                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                       value={formData.totalPercentile}
                       onChange={e =>
                         setFormData({ ...formData, totalPercentile: e.target.value })
                       }
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Maths Percentile
                     </label>
                     <input
                       type="number"
                       step="any"
                       // required
                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                       value={formData.mathematicsPercentile}
                       onChange={e =>
                         setFormData({ ...formData, mathematicsPercentile: e.target.value })
                       }
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Physics Percentile
                     </label>
                     <input
                       type="number"
                       step="any"
                       // required
                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                       value={formData.physicsPercentile}
                       onChange={e =>
                         setFormData({ ...formData, physicsPercentile: e.target.value })
                       }
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Chemistry Percentile
                     </label>
                     <input
                       type="number"
                       step="any"
                       // required
                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                       value={formData.chemistryPercentile}
                       onChange={e =>
                         setFormData({ ...formData, chemistryPercentile: e.target.value })
                       }
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Biology Percentile
                     </label>
                     <input
                       type="number"
                       step="any"
                       // required
                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                       value={formData.biologyPercentile}
                       onChange={e =>
                         setFormData({ ...formData, biologyPercentile: e.target.value })
                       }
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       Tags
                     </label>
                     <input
                       type="text"
                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                       value={formData.Tag}
                       onChange={e =>
                         setFormData({ ...formData, Tag: e.target.value })
                       }
                       placeholder="Enter tag like, Board Topper"
                     />
                   </div>
                 </div>
               </div>
             </div>
   
             <div className="border-t pt-6">
               <button
                 type="submit"
                 disabled={isSubmitting}
                 className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700"
               >
                 {isSubmitting ? "Submitting..." : "Add Student"}
               </button>
             </div>
           </form>
         </div>
       </div>
  ) : null;
};

export default EditCETStudentModal;
