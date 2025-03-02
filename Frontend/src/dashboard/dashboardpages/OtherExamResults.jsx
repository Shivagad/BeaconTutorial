import React, { useState, useCallback, useEffect } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddOtherExamStudentModal from '../OtherExamResults/AddOtherExamStudentModal';
import EditOtherExamStudentModal from '../OtherExamResults/EditOtherExamStudentModal';
import DeleteOtherExamStudentModal from '../OtherExamResults/DeleteOtherExamStudentModal';

const OtherExamResults = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);
  const [deleteStudentId, setDeleteStudentId] = useState(null);
  const [students, setStudents] = useState([]);

  const fetchStudents = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:4000/server/other-exam-results");
      response.data.data ? setStudents(response.data.data) : setStudents([]);
    } catch (error) {
      setStudents([]);
      console.error("Error fetching student data:", error);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const setToast = (msg) => {
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
        <h1 className="text-2xl font-bold text-gray-800">Other Exam Toppers</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Student
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {students.map((student) => (
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
                <p className="text-blue-600 text-lg">Exam: {student.ExamName}</p>
                <p className="text-gray-600 text-sm">Tag: {student.Tag}</p>
                <p className="text-gray-600 text-sm">Sequence No: {student.seqno}</p>
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

      <AddOtherExamStudentModal
        setToast={setToast}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <EditOtherExamStudentModal
        setToast={setToast}
        isEditOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        id={editStudentId}
      />

      <DeleteOtherExamStudentModal
        setToast={setToast}
        isDeleteOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        id={deleteStudentId}
      />
    </div>
  );
};

export default OtherExamResults;