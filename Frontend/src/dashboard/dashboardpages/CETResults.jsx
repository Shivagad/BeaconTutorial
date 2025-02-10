import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCETStudentModal from '../CETResult/AddCETStudentModal';
import EditCETStudentModal from '../CETResult/EditCETStudent';
import DeleteCETStudentModal from '../CETResult/DeleteCETStudentModal';

const CETResults = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);
  const [deleteStudentId, setDeleteStudentId] = useState(null);
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/server/cet/students");
      response.data.data ? setStudents(response.data.data) : setStudents([]);
    } catch (error) {
        setStudents([])
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const setToast = (msg) => {
    msg.success ? toast.success(msg.message) : toast.error(msg.message);
    fetchStudents();
  };

  const setToast2 = (msg) => {
    msg.success ? toast.success(msg.message) : toast.error(msg.message);
    fetchStudents();
  };

  const setToast3 = (msg) => {
    msg.success ? toast.success(msg.message) : toast.error(msg.message);
    fetchStudents();
  };

  const openEditModal = (id) => {
    setEditStudentId(id);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (id) => {
    setDeleteStudentId(id);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="p-6 ml-64">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">CET Class Toppers</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Student
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {students.length!==0 && students.map((student) => (
          <div
            key={student._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            {student.imagePath && (
              <img
                src={student.imagePath}
                alt={`${student.firstName} ${student.lastName}`}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {student.firstName} {student.lastName}
                </h3>
                <p className="text-blue-600 text-xl">
                  Total Percentile: {student.totalPercentile}%ile
                </p>
                <p className="text-blue-600 text-xl">
                  Mathematics Percentile: {student.mathematicsPercentile}%
                </p>
                <p className="text-blue-600 text-xl">
                  Physics Percentile: {student.physicsPercentile}%
                </p>
                <p className="text-blue-600 text-xl">
                  Chemistry Percentile: {student.chemistryPercentile}%
                </p>
                <p className="text-blue-600 text-xl">
                    Biology Percentile: {student.biologyPercentile}%
                  </p>
                <p className="text-blue-600 text-xl">
                  College: {student.college || "N/A"}
                </p>
                
                <p className="text-blue-600 text-xl">
                  Tag: {student.Tag || "N/A"}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openEditModal(student._id)}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => openDeleteModal(student._id)}
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddCETStudentModal
        setToast={setToast}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <EditCETStudentModal
        setToast2={setToast2}
        isEditOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        id={editStudentId}
      />

      <DeleteCETStudentModal
        setToast3={setToast3}
        isDeleteOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        id={deleteStudentId}
      />
    </div>
  );
};

export default CETResults;
