import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import axios from 'axios';

const StudentResult = () => {
  const { currentUser } = useAuth();
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [detailedResult, setDetailedResult] = useState(null);

  useEffect(() => {
    if (currentUser?.email) {
      axios.get(`https://beacon-tutorial.vercel.app/server/student/getresult/${currentUser.email}`)
        .then(response => {
          if (response.data.success) {
            setResults(response.data.results);
          } else {
            console.error("Error fetching results:", response.data.message);
          }
        })
        .catch(error => console.error("Error fetching results:", error));
    }
  }, [currentUser]);

  const fetchDetailedResult = (resultId) => {
    axios.get(`https://beacon-tutorial.vercel.app/server/student/resultbyid/${resultId}`)
      .then(response => {
        if (response.data.success) {
          setDetailedResult(response.data.result);
          setShowModal(true);
        } else {
          console.error("Error fetching result details:", response.data.message);
        }
      })
      .catch(error => console.error("Error fetching result details:", error));
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="w-full md:w-2/3 bg-white shadow-lg p-6 rounded-lg overflow-x-auto">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Exam Results</h2>
        {results.length > 0 ? (
          <table className="w-full border-collapse border border-blue-500 text-sm md:text-base">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-2 border">Exam</th>
                <th className="p-2 border">Exam Date</th>
                <th className="p-2 border">Marks</th>
                <th className="p-2 border">Out of</th>
                <th className="p-2 border">Correct</th>
                <th className="p-2 border">Incorrect</th>
                <th className="p-2 border">More Details</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                  <td className="p-2 border text-center">{result.exam}</td>
                  <td className="p-2 border text-center">{new Date(result.examDate).toLocaleDateString()}</td>
                  <td className="p-2 border text-center">{result.totalMarks}</td>
                  <td className="p-2 border text-center">{result.outof}</td>
                  <td className="p-2 border text-center">{result.correctAnswers}</td>
                  <td className="p-2 border text-center">{result.incorrectAnswers}</td>
                  <td 
                    className="p-2 border text-center text-blue-600 cursor-pointer hover:underline" 
                    onClick={() => fetchDetailedResult(result._id)}
                  >
                    More Details
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No results available.</p>
        )}
        
        {showModal && detailedResult && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 pr-4">
    <div className="bg-white p-6 rounded-lg w-11/12 md:w-3/4 lg:w-2/3 max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-600">{detailedResult.exam} - Detailed Result</h2>
        <button 
          className="text-red-500 text-lg font-bold"
          onClick={() => setShowModal(false)}
        >
          X
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 mb-4 text-sm md:text-base">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-2 border">Exam</th>
              <th className="p-2 border">Exam Date</th>
              <th className="p-2 border">Rank</th>
              <th className="p-2 border">Roll No</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border text-center">{detailedResult.exam}</td>
              <td className="p-2 border text-center">{new Date(detailedResult.examDate).toLocaleDateString()}</td>
              <td className="p-2 border text-center">{detailedResult.rank}</td>
              <td className="p-2 border text-center">{currentUser.rollNo}</td>
            </tr>
          </tbody>
        </table>
        <table className="w-full border border-gray-300 mb-4 text-sm md:text-base">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-2 border">Marks</th>
              <th className="p-2 border">Out of</th>
              <th className="p-2 border">Correct</th>
              <th className="p-2 border">Incorrect</th>
              <th className="p-2 border">Unattempted</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border text-center">{detailedResult.totalMarks}</td>
              <td className="p-2 border text-center">{detailedResult.outof}</td>
              <td className="p-2 border text-center">{detailedResult.correctAnswers}</td>
              <td className="p-2 border text-center">{detailedResult.incorrectAnswers}</td>
              <td className="p-2 border text-center">{detailedResult.notAttempted}</td>
            </tr>
          </tbody>
        </table>

        <table className="w-full border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-2 border">Physics</th>
              <th className="p-2 border">Sec A</th>
              <th className="p-2 border">Sec B</th>
              <th className="p-2 border">Chem</th>
              <th className="p-2 border">Sec A</th>
              <th className="p-2 border">Sec B</th>
              <th className="p-2 border">Maths</th>
              <th className="p-2 border">Sec A</th>
              <th className="p-2 border">Sec B</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border text-center">{detailedResult.physics}</td>
              <td className="p-2 border text-center">{detailedResult.physicsSectionA}</td>
              <td className="p-2 border text-center">{detailedResult.physicsSectionB}</td>
              <td className="p-2 border text-center">{detailedResult.chemistry}</td>
              <td className="p-2 border text-center">{detailedResult.chemistrySectionA}</td>
              <td className="p-2 border text-center">{detailedResult.chemistrySectionB}</td>
              <td className="p-2 border text-center">{detailedResult.maths}</td>
              <td className="p-2 border text-center">{detailedResult.mathsSectionA}</td>
              <td className="p-2 border text-center">{detailedResult.mathsSectionB}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default StudentResult;
