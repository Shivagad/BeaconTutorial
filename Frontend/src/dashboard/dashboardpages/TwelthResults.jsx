import React, { useState,useCallback, useEffect } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Add12StudentModal from '../12thResult/Add12StudentModal';
import Edit12StudentModal from '../12thResult/Edit12Student';
import Delete12StudentModal from '../12thResult/Delete12StudentModal';

const TwelthResult = () => {

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editStudentId, setEditStudentId] = useState(null);
  const [deleteStudentId, setDeleteStudentId] = useState(null);

  const [students, setStudents] = useState([]);
  const fetchStudents = useCallback(async () => {
    try {
      const response = await axios.get("https://beacon-tutorial.vercel.app/server/twelve/students");
      console.log(response.data.data)
      response.data.data ? setStudents(response.data.data) : setStudents([]);
    } catch (error) {
      setStudents([])
      console.error("Error fetching student data:", error);
    }
  }, []);
  
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);
  

  const setToast = (msg) => {
    msg.success ? toast.success(msg.message) : toast.error(msg.message);
    fetchStudents();
  }

  const setToast2 = (msg) => {
    msg.success ? toast.success(msg.message) : toast.error(msg.message);
    fetchStudents();
  }
  const setToast3 = (msg) => {
    msg.success ? toast.success(msg.message) : toast.error(msg.message);
    fetchStudents();
  }

  // When the Edit button is clicked, store the selected student ID and open the Edit modal.
  const openEditModal = (id) => {
    setEditStudentId(id);
    setIsEditModalOpen(true);
  };

  // When the Delete button is clicked, store the selected student ID and open the Delete modal.
  const openDeleteModal = (id) => {
    setDeleteStudentId(id);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="p-6 ml-64">
      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">12th Class Toppers</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Student
        </button>
      </div>

      {/* Student Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            {/* Display student's image if available */}
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
                 Percentage : {(student.percentage)}%
                </p>
                <p className="text-blue-600  text-xl">
                 Physics Mark : {parseInt(student.physicsMarks)}
                </p>
                <p className="text-blue-600  text-xl">
                 Physics Mark : {parseInt(student.chemistryMarks)}
                </p>
                <p className="text-blue-600  text-xl">
                 Math Marks : {parseInt(student.mathMarks)}
                </p>
                <p className="text-blue-600  text-xl">
                 Biology Marks : {parseInt(student.biologyMarks)}
                </p>
                <p className="text-blue-600  text-xl">
                 Board : {(student.boardName)}
                </p>
                <p className="text-blue-600 text-xl">
                 Tag : {(student.Tag)}
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

      {/* Add Student Modal */}
      <Add12StudentModal
        setToast={setToast}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Edit Student Modal: Pass the selected student's ID and onSubmit callback */}
      <Edit12StudentModal
        setToast={setToast}
        isEditOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        id={editStudentId}
        setToast2={setToast2}
      />

      {/* Delete Student Modal: Pass the selected student's ID and onDelete callback */}
      <Delete12StudentModal
        setToast={setToast}
        isDeleteOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        id={deleteStudentId}
        setToast3={setToast3}
      />
    </div>
  );
};

export default TwelthResult;
