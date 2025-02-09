import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import AddStudentModal from '../dashboardcomponents/AddStudentModal';

const TenthResults = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      percentage: 95.6,
      subjects: {
        math: 98,
        science: 95,
        english: 92,
        socialStudies: 96,
        hindi: 97,
      },
    },
    
  ]);

  const handleAddStudent = (studentData) => {
    setStudents([
      ...students,
      {
        ...studentData,
        id: Math.random().toString(36).substr(2, 9),
      },
    ]);
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div className="p-6 ml-64">
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
                  {student.percentage.toFixed(1)}%
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {/* Implement edit functionality */}}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteStudent(student.id)}
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {Object.entries(student.subjects).map(([subject, marks]) => (
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

      <AddStudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddStudent}
      />
    </div>
  );
};

export default TenthResults;

