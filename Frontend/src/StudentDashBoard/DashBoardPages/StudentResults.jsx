import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import axios from 'axios';
import { AlertCircle, ChevronRight, CheckCircle, XCircle, Award, X } from 'lucide-react';

const StudentResult = () => {
  const { currentUser } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNoResult, setShowNoResult] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [detailedResult, setDetailedResult] = useState(null);

  useEffect(() => {
    if (currentUser?.email) {
      axios
        .get(`https://beacon-tutorial.vercel.app/server/student/getresult/${currentUser.email}`)
        .then(response => {
          if (response.data.success) {
            setResults(response.data.results);
          } else {
            console.error("Error fetching results:", response.data.message);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching results:", error);
          setLoading(false);
        });
    }

    const timeout = setTimeout(() => {
      if (loading) {
        setShowNoResult(true);
        setLoading(false);
      }
    }, 30000);

    return () => clearTimeout(timeout);
  }, [currentUser, loading]);

  const fetchDetailedResult = (resultId) => {
    axios
      .get(`https://beacon-tutorial.vercel.app/server/student/resultbyid/${resultId}`)
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

  // Calculate percentage for progress bars
  const calculatePercentage = (marks, outOf) => {
    return (marks / outOf) * 100;
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Exam Results</h2>
        <p className="text-gray-600">View your academic performance and exam scores</p>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="space-y-3">
              <div className="h-5 bg-gray-200 rounded"></div>
              <div className="h-5 bg-gray-200 rounded w-5/6"></div>
              <div className="h-5 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      ) : showNoResult || results.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-800 mb-2">No Results Available</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Your exam results will appear here once they've been evaluated and published by your teachers.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Results Summary Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Results Summary</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-2">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <p className="text-sm text-gray-600">Total Exams</p>
                <p className="text-2xl font-bold text-[#4E77BB]">{results.length}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <p className="text-sm text-gray-600">Latest Score</p>
                <p className="text-2xl font-bold text-green-600">
                  {results[0]?.totalMarks}/{results[0]?.outof}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                <p className="text-sm text-gray-600">Latest Rank</p>
                <p className="text-2xl font-bold text-purple-600">{results[0]?.rank || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 pb-0">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Exam Results</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-y">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Correct</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Incorrect</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {results.map((result, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-800">{result.exam}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {new Date(result.examDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-medium text-gray-800">
                            {result.totalMarks}/{result.outof}
                          </span>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-[#4E77BB] h-2 rounded-full" 
                              style={{ width: `${calculatePercentage(result.totalMarks, result.outof)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm font-medium text-gray-800">{result.correctAnswers}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center">
                          <XCircle className="h-4 w-4 text-red-500 mr-1" />
                          <span className="text-sm font-medium text-gray-800">{result.incorrectAnswers}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => fetchDetailedResult(result._id)}
                          className="inline-flex items-center px-3 py-1 border border-[#4E77BB] text-sm font-medium rounded-md text-[#4E77BB] bg-white hover:bg-blue-50 transition-colors focus:outline-none"
                        >
                          Details
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Result Modal */}
      {showModal && detailedResult && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">{detailedResult.exam} - Detailed Result</h3>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Result Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-xs text-gray-600 mb-1">Total Score</p>
                  <p className="text-xl font-bold text-[#4E77BB]">
                    {detailedResult.totalMarks}/{detailedResult.outof}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-xs text-gray-600 mb-1">Correct</p>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    <p className="text-xl font-bold text-green-600">{detailedResult.correctAnswers}</p>
                  </div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <p className="text-xs text-gray-600 mb-1">Incorrect</p>
                  <div className="flex items-center justify-center">
                    <XCircle className="h-4 w-4 text-red-500 mr-1" />
                    <p className="text-xl font-bold text-red-500">{detailedResult.incorrectAnswers}</p>
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <p className="text-xs text-gray-600 mb-1">Unattempted</p>
                  <p className="text-xl font-bold text-orange-500">{detailedResult.notAttempted}</p>
                </div>
              </div>

              {/* General Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Exam</p>
                    <p className="font-medium">{detailedResult.exam}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="font-medium">
                      {new Date(detailedResult.examDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Rank</p>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-yellow-500 mr-1" />
                      <p className="font-medium">{detailedResult.rank || 'N/A'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Roll No</p>
                    <p className="font-medium">{currentUser?.rollNo || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Subject Scores */}
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Subject Scores</h4>
              <div className="mb-6">
                <div className="bg-white border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-3 divide-x border-b">
                    <div className="p-4">
                      <h5 className="text-sm font-semibold text-gray-800 mb-3">Physics</h5>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Total:</span>
                        <span className="text-sm font-medium">{detailedResult.physics}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Section A:</span>
                        <span className="text-sm font-medium">{detailedResult.physicsSectionA}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Section B:</span>
                        <span className="text-sm font-medium">{detailedResult.physicsSectionB}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h5 className="text-sm font-semibold text-gray-800 mb-3">Chemistry</h5>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Total:</span>
                        <span className="text-sm font-medium">{detailedResult.chemistry}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Section A:</span>
                        <span className="text-sm font-medium">{detailedResult.chemistrySectionA}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Section B:</span>
                        <span className="text-sm font-medium">{detailedResult.chemistrySectionB}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h5 className="text-sm font-semibold text-gray-800 mb-3">Mathematics</h5>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Total:</span>
                        <span className="text-sm font-medium">{detailedResult.maths}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Section A:</span>
                        <span className="text-sm font-medium">{detailedResult.mathsSectionA}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Section B:</span>
                        <span className="text-sm font-medium">{detailedResult.mathsSectionB}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Visualization */}
              {/* <h4 className="text-lg font-semibold text-gray-800 mb-3">Performance Overview</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {['Physics', 'Chemistry', 'Mathematics'].map((subject, index) => {
                  const subjectKey = subject === 'Mathematics' ? 'maths' : subject.toLowerCase();
                  const score = detailedResult[subjectKey] || 0;
                  const maxScore = detailedResult.outof / 3; // Assuming equal distribution
                  const percentage = (score / maxScore) * 100;
                  
                  return (
                    <div key={index} className="bg-white border rounded-lg p-4">
                      <h5 className="text-sm font-semibold mb-2">{subject}</h5>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">{score}/{maxScore}</span>
                        <span className="text-sm font-medium">{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            percentage >= 75 ? 'bg-green-500' : 
                            percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentResult;