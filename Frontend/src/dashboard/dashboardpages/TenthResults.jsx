import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import Add10StudentModal from '../dashboardcomponents/Add10StudentModal';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Edit10StudentModal from '../dashboardcomponents/Edit10Student';
import DeleteStudentModal from '../dashboardcomponents/DeleteStudentModal';

const TenthResults = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [handleDelete,setHandleDelete]=useState(false);
  const [handleEdit,setHandleEdit]=useState(false);
  const [students, setStudents] = useState([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      percentage: 95.6,
      subjects: {
        math: 98,
        science: 95,
        english: 90,
        history: 85,
      },
    },
  ]);

  // Function to show toast notifications
  const setToast = (msg) => 
    msg.success ? toast.success(msg.message) : toast.error(msg.message);  

  // Handle adding a new student from modal
  const handleAddStudent = (studentData) => {
    if (!studentData.firstName || !studentData.lastName || !studentData.percentage) {
      setToast({ success: false, message: "All fields are required!" });
      return;
    }

    setStudents([
      ...students,
      {
        ...studentData,
        id: Math.random().toString(36).substr(2, 9), // Unique ID
      },
    ]);

    setToast({ success: true, message: "Student added successfully!" });
  };

  // Handle deleting a student
  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
    setToast({ success: true, message: "Student removed successfully!" });
  };

  return (
    <div className="p-6 ml-64">
      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6 ">
        <h1 className="text-2xl font-bold text-gray-800">10th Class Toppers</h1>
        <button
          onClick={() => setIsModalOpen(true)}
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
                  onClick={() => setHandleEdit(true)}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Edit className="w-5 h-5"
                   />
                </button>
                <button
                  onClick={() => setHandleDelete(true)}
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Edit10StudentModal
      setToast={setToast}
      isEditOpen={handleEdit}
      onClose={() => setHandleEdit(false)}
      />

      <DeleteStudentModal
      setToast={setToast}
      isDeleteOpen={handleDelete}
      onClose={() => setHandleDelete(false)}
      />
    </div>
  );
};

export default TenthResults;
