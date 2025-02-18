import React, { useState, useEffect } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAdminModal from "../Admin/AddAdmin";
import EditAdminModal from "../Admin/EditAdmin";
import DeleteAdminModal from "../Admin/DeleteAdmin";

const AdminManagement = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editAdminId, setEditAdminId] = useState(null);
  const [deleteAdminId, setDeleteAdminId] = useState(null);
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:4000/server/dashadmin/");
      console.log(response); 
      if (response.data) {
        setAdmins(response.data);
      } else {
        setAdmins([]);
      }
    } catch (error) {
      setAdmins([]);
      console.error("Error fetching admin data:", error);
    }
  };
  

  useEffect(() => {
    fetchAdmins();
  }, []);

  const setToast = (msg) => {
    msg.success ? toast.success(msg.message) : toast.error(msg.message);
    fetchAdmins();
  };

  const openEditModal = (id) => {
    setEditAdminId(id);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (id) => {
    setDeleteAdminId(id);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="p-6 ml-64">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Admin
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {admins.length !== 0 &&
          admins.map((admin) => (
            <div
              key={admin._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                <h3 className="text-lg font-semibold">{admin.name}</h3>
                <h3 className="text-lg font-semibold">{admin.email}</h3>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(admin._id)}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => openDeleteModal(admin._id)}
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <AddAdminModal
        setToast={setToast}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <EditAdminModal
        setToast={setToast}
        isEditOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        id={editAdminId}
      />

      <DeleteAdminModal
        setToast={setToast}
        isDeleteOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        id={deleteAdminId}
      />
    </div>
  );
};

export default AdminManagement;
