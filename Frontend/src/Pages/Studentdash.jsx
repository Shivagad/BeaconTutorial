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
    if (currentUser?.course) {
      axios.get(`http://localhost:4000/server/courses/getid/${currentUser.course}`)
        .then(response => setCourseDetails(response.data.course))
        .catch(error => console.error("Error fetching course details:", error));
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser?._id) {
      axios.get(`http://localhost:4000/server/results/${currentUser._id}`)
        .then(response => setResults(response.data.results))
        .catch(error => console.error("Error fetching results:", error));
    }
  }, [currentUser]);

  return (
    <div className="h-screen flex flex-col bg-gray-100 p-4">
      
      {/* Top Section - Buttons */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate('/student-dashboard/blog')}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          View Blog
        </button>
        <h1 className="text-4xl font-bold text-center text-blue-600 flex-1">Student Dashboard</h1>
      </div>

      <div className="flex gap-6">
        {/* Left Section - Profile */}
        <div className="w-1/3 bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Profile</h2>
          {currentUser && (
            <div className="text-center">
              <img 
                src={currentUser.profilePicture} 
                alt="Profile" 
                className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 shadow-lg"
              />
              <p className="text-xl font-semibold mt-4">{currentUser.name}</p>
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
        
        {/* Middle Section - Parent Details */}
        <div className="w-1/3 bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Parent Details</h2>
          <p className="text-gray-600">Father: {currentUser.fatherName} ({currentUser.fatherMobile})</p>
          <p className="text-gray-600">Mother: {currentUser.motherName}</p>
          <p className="text-gray-600">Parent Email: {currentUser.parentEmail}</p>
          <h2 className="text-2xl font-bold text-blue-600 mt-4">Address</h2>
          <p className="text-gray-600">{currentUser.address}, {currentUser.city}, {currentUser.state}</p>
        </div>
      
        {/* Right Section - Course Details */}
        <div className="w-1/3 bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Course Details</h2>
          {courseDetails ? (
            <>
              <p className="text-gray-600">Course: {courseDetails.name}</p>
              <p className="text-gray-600">Instructor: {courseDetails.instructor}</p>
              <p className="text-gray-600">Duration: {courseDetails.duration} months</p>
            </>
          ) : (
            <p className="text-gray-500">Loading course details...</p>
          )}
        </div>
      </div>

      {/* Bottom Section - Exam Results */}
      <div className="mt-6 bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Exam Results</h2>
        {results.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300 shadow-md">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3 border border-gray-300">Exam</th>
                <th className="p-3 border border-gray-300">Score</th>
                <th className="p-3 border border-gray-300">Status</th>
                <th className="p-3 border border-gray-300">Date</th>
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
                  <td className="p-3 border border-gray-300">{new Date(result.date).toLocaleDateString()}</td>
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

export default StudentDashboard;
