import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fetch course details
    if (currentUser?.course) {
      axios.get(`https://beacon-tutorial.vercel.app/server/courses/getid/${currentUser.course}`)
        .then(response => setCourseDetails(response.data.course))
        .catch(error => console.error("Error fetching course details:", error));
    }

    // Fetch student results by email
    if (currentUser?.email) {
      axios.get(`https://beacon-tutorial.vercel.app/server/student/getresult/${currentUser.email}`)
        .then(response => {
          // console.log(response.data);
          if (response.data.success) {
            setResults(response.data.results);
          } else {
            console.error("Error fetching results:", response.data.message);
          }
        })
        .catch(error => console.error("Error fetching results:", error));
    }
  }, [currentUser]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-center text-blue-600 flex-1">Student Dashboard</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Section */}
        <div className="w-full md:w-1/3 bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Profile</h2>
          {currentUser && (
            <div className="text-center">
              <img 
                src={currentUser.profilePicture} 
                alt="Profile" 
                className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 shadow-lg"
              />
              <p className="text-xl font-semibold mt-4">{currentUser.name}</p>
              <p className="text-xl font-semibold mt-4">{currentUser.rollNo}</p>
              <p className="text-gray-600">Email: {currentUser.email}</p>
              <p className="text-gray-600">Mobile: {currentUser.mobile}</p>
              <p className="text-gray-600">DOB: {new Date(currentUser.dob).toLocaleDateString()}</p>
              <p className="text-gray-600">Gender: {currentUser.gender}</p>
              <p className="text-gray-600">Admission Year: {currentUser.admissionYear}</p>
            </div>
          )}
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="bg-red-500 text-white px-3 py-1 mt-4 rounded-lg text-sm hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Results Section */}
<div className="w-full md:w-2/3 bg-white shadow-lg p-6 rounded-lg">
  <h2 className="text-2xl font-bold text-blue-600 mb-4">Exam Results</h2>
  {results.length > 0 ? (
    <table className="w-full border-collapse border border-gray-300 shadow-md text-sm md:text-base">
      <thead>
        <tr className="bg-blue-500 text-white">
          <th className="p-2 md:p-3 border border-gray-300">Exam</th>
          <th className="p-2 md:p-3 border border-gray-300">Exam Date</th>
          <th className="p-2 md:p-3 border border-gray-300">Total Marks</th>
          <th className="p-2 md:p-3 border border-gray-300">Rank</th>
          <th className="p-2 md:p-3 border border-gray-300">Physics</th>
          <th className="p-2 md:p-3 border border-gray-300">Chemistry</th>
          <th className="p-2 md:p-3 border border-gray-300">Maths</th>
          <th className="p-2 md:p-3 border border-gray-300">Biology</th>
          <th className="p-2 md:p-3 border border-gray-300">Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
            <td className="p-2 md:p-3 border border-gray-300 text-center">{result.exam}</td>
            <td className="p-2 md:p-3 border border-gray-300 text-center">
              {new Date(result.examDate).toLocaleDateString()}
            </td>
            <td className="p-2 md:p-3 border border-gray-300 text-center">{result.totalMarks}</td>
            <td className="p-2 md:p-3 border border-gray-300 text-center">{result.rank}</td>
            <td className="p-2 md:p-3 border border-gray-300 text-center">{result.physics}</td>
            <td className="p-2 md:p-3 border border-gray-300 text-center">{result.chemistry}</td>
            <td className="p-2 md:p-3 border border-gray-300 text-center">{result.maths}</td>
            <td className="p-2 md:p-3 border border-gray-300 text-center">{result.biology}</td>
            <td className="p-2 md:p-3 border border-gray-300 text-center">
              {new Date(result.timestamp).toLocaleDateString()}
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
    </div>
  );
};

export default StudentDashboard;
