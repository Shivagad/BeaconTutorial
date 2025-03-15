import React, { useState } from 'react';
import { AuthForm } from '../Components/AuthForm';
import { GraduationCap, UserCog, X, ArrowLeft } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import beaconlogo from '../../public/images/logo.png'; // adjust the path as needed

// LeftPanel component: displays the blue background with logo and text.
const LeftPanel = ({ userType, }) => {
  return (
    <div className="h-full relative bg-[#4E77BB] text-white flex flex-col items-center justify-center p-8 md:p-12">
      <img src={beaconlogo} alt="Coaching Center Logo" className="w-30 h-30 mb-4" />
      <h2 className="text-3xl text-center font-bold">
        {userType === 'admin' ? 'Admin Administration' : 'Student Administration'}
        <p className="text-center">System</p>
      </h2>
      <p className="mt-4 text-center">
        At Beacon Tutorials, we are committed to the all-around development of our students.
      </p>
    </div>
  );
};

function Login() {
  const [userType, setUserType] = useState('student');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-[#4E77BB] relative">
      <Toaster position="top-right" />

      {/* Close Button for larger screens */}
      <button 
        onClick={() => navigate('/')} 
        className="hidden sm:block absolute top-4 right-4 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
      >
        <X className="h-5 w-5 text-gray-700" />
      </button>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
          
          {/* Left Panel for Desktop */}
          <div className="hidden md:block md:w-1/2">
            <LeftPanel userType={userType} />
          </div>
          
          {/* Right Panel: Contains AuthForm and controls */}
          <div className="w-full md:w-1/2 p-8 relative">
            {/* Back Arrow for Mobile */}
            <button 
              onClick={() => navigate('/')} 
              className="sm:hidden absolute top-4 left-4 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </button>

            {/* For Mobile, show LeftPanel once above the form */}
            <div className="block md:hidden mt-6 mb-4">
              <LeftPanel userType={userType} />
            </div>

            {/* User Type Selection Buttons at the top */}
            <div className="flex justify-center gap-6 mb-4">
              <button
                onClick={() => setUserType('student')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                  userType === 'student'
                    ? 'bg-[#4E77BB] text-white'
                    : 'bg-white text-[#4E77BB] hover:bg-blue-50'
                }`}
              >
                <GraduationCap className="h-5 w-5" />
                Student
              </button>
              
              <button
                onClick={() => setUserType('admin')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                  userType === 'admin'
                    ? 'bg-[#4E77BB] text-white'
                    : 'bg-white text-[#4E77BB] hover:bg-indigo-50'
                }`}
              >
                <UserCog className="h-5 w-5" />
                Admin
              </button>
            </div>

            {/* Login Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {userType === 'admin' ? 'Admin Login' : 'Student Login'}
              </h2>
            </div>

            {/* Authentication Form */}
            <AuthForm mode={userType === 'admin' ? 'admin-login' : 'student-login'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
