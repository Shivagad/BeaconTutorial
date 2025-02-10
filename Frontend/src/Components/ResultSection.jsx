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
                className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="aspect-square overflow-hidden flex items-center justify-center">
                  <img
                    src={student.imagePath}
                    alt={student.firstName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-center">{student.firstName}{student.lastName}</h3>
                  <div className="flex justify-between items-center bg-indigo-50 p-2 rounded-lg">
                    <span className="text-indigo-600 font-bold">
                      {student.percentage.toFixed(2)}%
                    </span>
                    {student.rank && (
                      <span className="text-gray-600 text-sm font-medium">
                        Rank: {student.rank}
                      </span>
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

