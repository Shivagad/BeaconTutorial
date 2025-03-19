import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import axios from 'axios';

const StudentResult = () => {
  const { currentUser } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
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
        .catch(error => console.error("Error fetching results:", error))
        .finally(() => setLoading(false));
    }
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 30000);

    return () => clearTimeout(timer);
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
        
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        ) : results.length > 0 ? (
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
          <div className="text-red-500 text-center mt-4">No results available</div>
        )}
      </div>
    </div>
  );
};

export default StudentResult;
