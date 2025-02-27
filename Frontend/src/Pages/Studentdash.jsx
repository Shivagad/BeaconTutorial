import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Studentdash = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (currentUser?.course) {
      axios
        .get(`http://localhost:4000/server/courses/getid/${currentUser.course}`)
        .then((response) => {
          setCourseDetails(response.data.course);
        })
        .catch((error) => {
          console.error("Error fetching course details:", error);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser?._id) {
      axios
        .get(`http://localhost:4000/server/results/${currentUser._id}`)
        .then((response) => {
          setResults(response.data.results);
        })
        .catch((error) => {
          console.error("Error fetching results:", error);
        });
    }
  }, [currentUser]);

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Left Section - Profile */}
      <div className="w-1/3 bg-white shadow-lg p-6 rounded-lg m-4">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-4">Profile</h1>
        
        {currentUser && (
          <div className="text-center">
            <img 
              src={currentUser.profilePicture} 
              alt="Profile" 
              className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 shadow-lg"
            />
            <p className="text-xl font-semibold mt-4">{currentUser.name}</p>
            <p className="text-gray-600">{currentUser.email}</p>
            <p className="text-gray-600">{currentUser.mobile}</p>

            {courseDetails ? (
              <p className="text-lg font-medium text-blue-700 mt-2">Course: {courseDetails.name}</p>
            ) : (
              <p className="text-gray-500 mt-2">Loading course details...</p>
            )}
          </div>
        )}

        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="bg-red-500 text-white px-4 py-2 mt-6 w-full rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>


      {/* Right Section - Results */}
      <div className="w-2/3 bg-white shadow-lg p-6 rounded-lg m-4">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Exam Results</h2>
        
        {results.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300 shadow-md">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3 border border-gray-300">Exam</th>
                <th className="p-3 border border-gray-300">Score</th>
                <th className="p-3 border border-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
                  <td className="p-3 border border-gray-300">{result.examName}</td>
                  <td className="p-3 border border-gray-300 font-semibold">{result.score}</td>
                  <td className="p-3 border border-gray-300">
                    {result.passed ? 
                      <span className="text-green-600 font-bold">Passed</span> : 
                      <span className="text-red-600 font-bold">Failed</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No results available.</p>
        )}
      </div>
    </div>
  );
};

export default Studentdash;
