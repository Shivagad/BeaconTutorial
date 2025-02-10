import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ResultSection = ({ title, students, bgColor }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const studentsPerPage = 10;
  const totalPages = Math.ceil(students.length / studentsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const currentStudents = students.slice(
    currentPage * studentsPerPage,
    (currentPage + 1) * studentsPerPage
  );

  return (
    <div className={`w-full py-12 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="sticky top-4 z-10 mb-8">
          <div className="bg-white/95 backdrop-blur-sm py-4 rounded-full shadow-lg">
            <h2 className="text-3xl font-bold text-center text-indigo-700">
              {title}
            </h2>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {currentStudents.map((student) => (
              <div
                key={student.id}
                className={`bg-${bgColor} rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-500`}
              >
                <div className="mx-auto mt-4 w-40 h-40 overflow-hidden rounded-full flex items-center justify-center">
                  <img
                    src={student.imagePath}
                    alt={student.firstName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-center">{student.firstName}  {student.lastName}</h3>
                  <div className={`flex-row justify-between items-center bg-${bgColor}-50 p-0 rounded-lg`}>

                    {student.AIR && (
                      <div className='p-0 pl-1'>
                        <span className="text-gray-600 text-sm font-small">
                          AIR - {student.AIR}
                        </span>
                      </div>
                    )}
                    {student.mathMarks && (
                      <div className='p-0 pl-1'>
                        <span className="text-gray-600 text-sm font-small">
                          Maths - {student.mathMarks}
                        </span>
                      </div>
                    )}
                    {student.scienceMarks && (
                      <div className='p-0 pl-1'>
                        <span className="text-gray-600 text-sm font-small">
                          Science - {student.scienceMarks}
                        </span>
                      </div>
                    )}
                    {student.chemistryMarks && (
                      <div className='p-0 pl-1'>
                        <span className="text-gray-600 text-sm font-small">
                          Chemistry - {student.chemistryMarks}
                        </span>
                      </div>
                    )}
                    {student.physicsMarks && (
                      <div className='p-0 pl-1'>
                        <span className="text-gray-600 text-sm font-small">
                          Physics - {student.physicsMarks}
                        </span>
                      </div>
                    )}
                    {student.biologyMarks && (
                      <div className='p-0 pl-1'>
                        <span className="text-gray-600 text-sm font-small">
                          Biology - {student.biologyMarks}
                        </span>
                      </div>
                    )}
                    {student.physicsPercentile && (
                      <div className='p-0 pl-1'>
                        <span className="text-gray-600 text-sm font-small">
                          Physics - {student.physicsPercentile}%ile
                        </span>
                      </div>
                    )}
                    {student.mathematicsPercentile && (
                      <div className='p-0 pl-1'>
                        <span className="text-gray-600 text-sm font-small">
                          Math - {student.mathematicsPercentile}%ile
                        </span>
                      </div>
                    )}
                    {student.chemistryPercentile && (
                      <div className='p-0 pl-1'>
                        <span className="text-gray-600 text-sm font-small">
                          Chemistry - {student.chemistryPercentile}%ile
                        </span>
                      </div>
                    )}
                    {student.biologyPercentile && (
                      <div className='p-0 pl-1'>
                        <span className="text-gray-600 text-sm font-small">
                          Biology - {student.biologoPercentile}%ile
                        </span>
                      </div>
                    )}
                    {student.totalPercentile && (
                      <div className='p-0 pl-1'>
                        <span className="text-gray-600 text-sm font-medium">
                          Aggregate - {student.totalPercentile}%ile
                        </span>
                      </div>
                    )}
                    {student.totalMarks && (
                      <div className='p-0 pl-1'>
                        <span className="text-gray-600 text-sm font-medium">
                          Aggregate - {student.totalMarks}
                        </span>
                      </div>
                    )}
                    {student.percentage && (
                      <div className='p-0 pl-1'>
                        <span className="text-gray-600 font-medium">
                        Aggregate - {student.percentage.toFixed(2)}%
                        </span>
                      </div>
                    )}
                    {student.boardName && (
                      <div className='p-0 pl-1 flex justify-center'>
                        <span className="text-gray-600 font-bold">
                         Board ({student.boardName})
                        </span>
                      </div>
                    )}
                    {student.college && (
                      <div className='p-0 pl-1 flex justify-center'>
                        <span className="text-gray-600 font-bold">
                         {student.college} College
                        </span>
                      </div>
                    )}
                    {student.Tag && (
                      <div className='p-0 pl-1 flex justify-center'>
                        <span className="text-gray-600 font-bold text-center">
                          {student.Tag}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="sticky bottom-4 z-10 flex justify-center items-center mt-8">
              <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className="p-2 rounded-full bg-indigo-100 text-indigo-700 disabled:opacity-50 hover:bg-indigo-200 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <span className="text-gray-700 font-medium">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                  className="p-2 rounded-full bg-indigo-100 text-indigo-700 disabled:opacity-50 hover:bg-indigo-200 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultSection;

