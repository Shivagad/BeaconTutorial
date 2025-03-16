import React, { useState, useEffect } from "react";
import axios from "axios";

const EditBatchModal = ({ setToast, isEditOpen, onClose, id }) => {
  const [batchName, setBatchName] = useState("");
  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    if (id) {
      const fetchBatch = async () => {
        try {
          const response = await axios.get(`https://beacon-tutorial.vercel.app/server/batches/getbatch/${id}`);
          if (response.data) {
            setBatchName(response.data.batchName);
            setStartDate(new Date(response.data.startDate).toISOString().split("T")[0]);
          }
        } catch (error) {
          console.error("Error fetching batch:", error);
        }
      };
      fetchBatch();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://beacon-tutorial.vercel.app/server/batches/updatebatch/${id}`,
        { batchName, startDate }
      );
      setToast({ success: true, message: response.data.message });
      onClose();
    } catch (error) {
      console.error("Error updating batch:", error);
      setToast({ success: false, message: "Failed to update batch." });
    }
  };

  if (!isEditOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Batch</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Batch Name</label>
            <input
              type="text"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBatchModal;
