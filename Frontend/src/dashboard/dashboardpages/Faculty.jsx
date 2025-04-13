import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddFacultyModal from '../Faculty/AddFacultyModal';
import EditFacultyModal from '../Faculty/EditFacultyModal';
import DeleteFacultyModal from '../Faculty/DeleteFacultyModal';

const Faculty = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editFacultyId, setEditFacultyId] = useState(null);
  const [deleteFacultyId, setDeleteFacultyId] = useState(null);

  const [facultyList, setFacultyList] = useState([]);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get("http://localhost:4000/server/faculty/getfaculty/all");
      // console.log(response);
      setFacultyList(response.data.data || []);
    } catch (error) {
      console.error("Error fetching faculty:", error);
      setFacultyList([]);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const setToast = (msg) => {
    msg.success ? toast.success(msg.message) : toast.error(msg.message);
    fetchFaculty();
  };

  const openEditModal = (id) => {
    setEditFacultyId(id);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (id) => {
    setDeleteFacultyId(id);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="p-6 ml-64">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Faculty</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Faculty
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {facultyList.map((faculty) => (
    <div
      key={faculty._id}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      {/* Faculty Image */}
      {faculty.profileImage && (
        <img
          src={faculty.profileImage}
          alt={faculty.name}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
      )}

      {/* Faculty Details */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">{faculty.name}</h3>
        <p className="text-gray-600"><strong>Email:</strong> {faculty.email}</p>
        <p className="text-gray-600"><strong>Phone:</strong> {faculty.phone}</p>
        <p className="text-gray-600"><strong>Qualification:</strong> {faculty.qualification}</p>
        <p className="text-gray-700"><strong>Subjects:</strong> {faculty.subjects.join(", ")}</p>
        <p className="text-gray-700"><strong>Bio:</strong> {faculty.bio}</p>
        <p className="text-gray-500">
          <strong>Joining Date:</strong> {new Date(faculty.joiningDate).toLocaleDateString()}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={() => openEditModal(faculty._id)}
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Edit className="w-5 h-5" />
        </button>
        <button
          onClick={() => openDeleteModal(faculty._id)}
          className="text-gray-600 hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  ))}
</div>


      <AddFacultyModal
        setToast={setToast}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <EditFacultyModal
        setToast={setToast}
        isEditOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        id={editFacultyId}
      />

      <DeleteFacultyModal
        setToast={setToast}
        isDeleteOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        id={deleteFacultyId}
      />
    </div>
  );
};

export default Faculty;
