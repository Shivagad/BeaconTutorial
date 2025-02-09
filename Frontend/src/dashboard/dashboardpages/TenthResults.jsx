import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Add10StudentModal from '../dashboardcomponents/Add10StudentModal';
import Edit10StudentModal from '../dashboardcomponents/Edit10Student';
import DeleteStudentModal from '../dashboardcomponents/DeleteStudentModal';

const TenthResults = () => {
  // Modal control states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Store selected student IDs for edit and delete
  const [editStudentId, setEditStudentId] = useState(null);
  const [deleteStudentId, setDeleteStudentId] = useState(null);

  // Students state (fetched from the backend)
  const [students, setStudents] = useState([]);

  // Function to show toast notifications
  const setToast = (msg) =>
    msg.success ? toast.success(msg.message) : toast.error(msg.message);

  // Fetch student data from backend API on mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:4000/server/thenth/");
        // Assuming response.data is an array of student objects
        setStudents(response.data);
      } catch (error) {
        setToast({ success: false, message: "Error fetching student data" });
        console.error("Error fetching student data:", error);
      }
    };
    fetchStudents();
  }, []);

  // Handle adding a new student (this callback is passed to the Add modal)
  const handleAddStudent = (studentData) => {
    if (!studentData.firstName || !studentData.lastName || !studentData.percentage) {
      setToast({ success: false, message: "All fields are required!" });
      return;
    }

    // Optionally, you can call your backend API to add the student here.
    // For demonstration, we'll update the local state.
    const newStudent = {
      ...studentData,
      id: Math.random().toString(36).substr(2, 9), // Generate a unique ID (if not provided by the backend)
    };
    setStudents([...students, newStudent]);
    setToast({ success: true, message: "Student added successfully!" });
  };

  // Handle deleting a student (this callback is passed to the Delete modal)
  const handleDeleteStudent = (id) => {
    // Optionally, call your backend API to delete the student here.
    setStudents(students.filter((student) => student.id !== id));
    setToast({ success: true, message: "Student removed successfully!" });
  };

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
        <h1 className="text-2xl font-bold text-gray-800">10th Class Toppers</h1>
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
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {student.firstName} {student.lastName}
                </h3>
                <p className="text-blue-600 font-bold text-xl">
                  {parseFloat(student.percentage).toFixed(1)}%
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openEditModal(student.id)}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => openDeleteModal(student.id)}
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Subjects & Marks */}
            <div className="space-y-2">
              {student.subjects &&
                Object.entries(student.subjects).map(([subject, marks]) => (
                  <div key={subject} className="flex justify-between items-center">
                    <span className="text-gray-600 capitalize">
                      {subject.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-medium">{marks}%</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Student Modal */}
      <Add10StudentModal
        setToast={setToast}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddStudent}
      />

      {/* Edit Student Modal: Pass the selected student's ID */}
      <Edit10StudentModal
        setToast={setToast}
        isEditOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        id={editStudentId}
      />

      {/* Delete Student Modal: Pass the selected student's ID */}
      <DeleteStudentModal
        setToast={setToast}
        isDeleteOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        id={deleteStudentId}
        onDelete={handleDeleteStudent}
      />
    </div>
  );
};

export default TenthResults;
