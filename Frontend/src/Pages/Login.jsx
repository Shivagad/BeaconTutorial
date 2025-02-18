import React, { useState } from 'react';
import { AuthForm } from '../Components/AuthForm';
import { GraduationCap, UserCog, X, ArrowLeft } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userType, setUserType] = useState('student');
  const [authMode, setAuthMode] = useState('student-login');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative">
      <Toaster position="top-right" />

      {/* Close Button (for larger screens) */}
      <button 
        onClick={() => navigate('/')} 
        className="hidden sm:block absolute top-4 right-4 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
      >
        <X className="h-5 w-5 text-gray-700" />
      </button>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* User Type Selection Buttons */}
          <div className="flex justify-center gap-6 mb-8">
            <button
              onClick={() => {
                setUserType('student');
                setAuthMode('student-login');
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                userType === 'student'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              <GraduationCap className="h-5 w-5" />
              Student
            </button>
            
            <button
              onClick={() => {
                setUserType('admin');
                setAuthMode('admin-login');
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                userType === 'admin'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <UserCog className="h-5 w-5" />
              Admin
            </button>
          </div>

          {/* Authentication Form */}
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 relative">
            
            {/* Back Arrow (for smaller screens) */}
            <button 
              onClick={() => navigate('/')} 
              className="sm:hidden absolute top-4 left-4 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {authMode === 'admin-login' ? 'Admin Login' : 
                 authMode === 'student-login' ? 'Student Login' : 'Student Sign Up'}
              </h2>
            </div>

            <AuthForm mode={authMode} />

            {userType === 'student' && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setAuthMode(authMode === 'student-login' ? 'student-signup' : 'student-login')}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {authMode === 'student-login' ? 
                    "Don't have an account? Sign up" : 
                    "Already have an account? Login"}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
