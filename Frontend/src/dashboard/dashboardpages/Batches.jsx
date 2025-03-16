import React, { useState, useEffect } from "react";
import { Edit } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditBatchModal from "./EditBatchModal";

const BatchManagement = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editBatchId, setEditBatchId] = useState(null);
  const [batches, setBatches] = useState([]);

  const fetchBatches = async () => {
    try {
      const response = await axios.get("http://localhost:4000/server/batches/getallbatch");
      if (response.data) {
        setBatches(response.data);
      } else {
        setBatches([]);
      }
    } catch (error) {
      setBatches([]);
      console.error("Error fetching batches:", error);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const setToast = (msg) => {
    msg.success ? toast.success(msg.message) : toast.error(msg.message);
    fetchBatches();
  };

  const openEditModal = (id) => {
    setEditBatchId(id);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-6 ml-64">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Batch Management</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {batches.length !== 0 &&
          batches.map((batch) => (
            <div
              key={batch._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{batch.batchName}</h3>
                  <p className="text-gray-600">Start Date: {new Date(batch.startDate).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => openEditModal(batch._id)}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
      </div>

      <EditBatchModal
        setToast={setToast}
        isEditOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        id={editBatchId}
      />
    </div>
  );
};

export default BatchManagement;
