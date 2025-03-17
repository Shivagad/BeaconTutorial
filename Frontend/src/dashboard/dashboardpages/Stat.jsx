import React, { useState, useEffect } from "react";
import { Edit } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditStatModal from "./EditStatModal";

const StatManagement = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await axios.get("http://localhost:4000/server/stat/getstat");
      if (response.data) {
        setStats(response.data);
      } else {
        setStats(null);
      }
    } catch (error) {
      setStats(null);
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const setToast = (msg) => {
    msg.success ? toast.success(msg.message) : toast.error(msg.message);
    fetchStats();
  };

  return (
    <div className="p-6 ml-64">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Stat Management</h1>
      </div>

      {stats && (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-lg font-semibold">Students Count: {stats.studentsCount}</div>
              <div className="text-lg font-semibold">Expert Faculty Count: {stats.expertFacultyCount}</div>
              <div className="text-lg font-semibold">Success Rate: {stats.successRate}%</div>
              <div className="text-lg font-semibold">Years of Experience: {stats.yearsOfExperience}+</div>
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <EditStatModal
        setToast={setToast}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

export default StatManagement;
