import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';


const ResultSection = ({ title, students, bgColor }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const studentsPerPage = 10;
  const totalPages = Math.ceil(students.length / studentsPerPage);
  const navRef = useRef(null);

  const handlePrevPage = () => {setCurrentPage((prev) => Math.max(prev - 1, 0));navRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });}
  const handleNextPage = () => {setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));navRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });}

  const currentStudents = students.slice(
    currentPage * studentsPerPage,
    (currentPage + 1) * studentsPerPage
  );

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 pt-24 py-12 rounded-2xl shadow-lg ${bgColor} mb-6`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="sticky z-10 -mt-20 mb-8">
          <div className="bg-white/95 border-b-4 py-4 py-12 rounded-2xl border-[#4E77BB] shadow-lg">
            <h2 className="text-4xl font-bold text-center text-[#4e77bb]">{title}</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {currentStudents.map((student) => (
            <div key={student.id} className="bg-white rounded-xl shadowmd transform hover:scale-105 transition-transform duration-500 border-2 border-[#4E77BB]">
              <div className="mx-auto mt-4 w-40 h-40 overflow-hidden rounded-full flex items-center justify-center border-4 border-[#4E77BB]">
                <img src={student.imagePath} alt={student.firstName} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg mb-2">{student.firstName} {student.lastName}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  {student.AIR && <p>AIR - {student.AIR}</p>}
                  {student.mathMarks && <p>Maths - {student.mathMarks}</p>}
                  {student.scienceMarks && <p>Science - {student.scienceMarks}</p>}
                  {student.chemistryMarks && <p>Chemistry - {student.chemistryMarks}</p>}
                  {student.physicsMarks && <p>Physics - {student.physicsMarks}</p>}
                  {student.biologyMarks && <p>Biology - {student.biologyMarks}</p>}
                  {student.physicsPercentile && <p>Physics - {student.physicsPercentile}%ile</p>}
                  {student.mathematicsPercentile && <p>Math - {student.mathematicsPercentile}%ile</p>}
                  {student.chemistryPercentile && <p>Chemistry - {student.chemistryPercentile}%ile</p>}
                  {student.biologyPercentile && <p>Biology - {student.biologyPercentile}%ile</p>}
                  {student.totalPercentile && <p>Aggregate - {student.totalPercentile}%ile</p>}
                  {student.totalMarks && <p>Aggregate - {student.totalMarks}</p>}
                  {student.percentage && <p>Aggregate - {student.percentage.toFixed(2)}%</p>}
                  {student.boardName && <p className="font-bold">Board ({student.boardName})</p>}
                  {student.college && <p className="font-bold">{student.college} College</p>}
                  {student.Tag && <p className="font-bold">{student.Tag}</p>}
                  {student.ExamName && <p className="font-bold">{student.ExamName}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div ref={navRef} className="sticky bottom-4 z-10 flex justify-center items-center mt-8">
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
  );
};

export default ResultSection;