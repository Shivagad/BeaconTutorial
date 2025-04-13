import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import axios from 'axios';
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Users } from 'lucide-react';

const BasicInfo = () => {
  const { currentUser } = useAuth();
  const [courseDetails, setCourseDetails] = useState(null);
  const studentInfo = {
    name: currentUser.name,
    rollNo: currentUser.rollNo,
    gender: currentUser.gender,
    dob: currentUser.dob,
    email: currentUser.email,
    mobile: currentUser.mobile,
    address: currentUser.address,
    state: currentUser.state,
    city: currentUser.city,
    admissionYear: currentUser.admissionYear,
  }

  const parentInfo = {
    fatherName: currentUser.fatherName,
    motherName: currentUser.motherName,
    parentEmail: currentUser.parentEmail,
    fatherMobile: currentUser.fatherMobile,
  }
  
  useEffect(() => {
    if (currentUser?.course) {
      axios.get(`http://localhost:4000/server/courses/getid/${currentUser.course}`)
        .then(response => {
          if (response.data?.course?.name) {
            setCourseDetails(response.data.course.name);
          } else {
            console.error("Course name not found in the response");
          }
        })
        .catch(error => console.error("Error fetching course details:", error));
    }
  }, [currentUser]);
  
  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Student Profile</h2>
        <p className="text-gray-600">View and manage your personal information</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-1 flex flex-col">
          <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
            <div className="bg-gradient-to-r from-blue-500 to-[#4E77BB] p-6 text-center">
              <div className="h-24 w-24 rounded-full bg-white text-[#4E77BB] text-3xl font-bold flex items-center justify-center mx-auto mb-4">
                {studentInfo.name.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-white">{studentInfo.name}</h3>
              <p className="text-blue-100">Roll No: {studentInfo.rollNo}</p>
            </div>
            
            <div className="p-6 space-y-4 flex-grow">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-[#4E77BB] mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Course</p>
                  <p className="font-medium">{courseDetails || "Loading..."}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-[#4E77BB] mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Admission Year</p>
                  <p className="font-medium">{studentInfo.admissionYear}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-[#4E77BB] mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-sm overflow-hidden text-ellipsis">{studentInfo.email}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-[#4E77BB] mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Mobile</p>
                  <p className="font-medium">{studentInfo.mobile}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Details */}
        <div className="md:col-span-2 flex flex-col space-y-6">
          {/* Personal Details */}
          <div className="bg-white rounded-xl shadow-md p-6 h-full">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-[#4E77BB] mr-2 flex-shrink-0" />
              <h3 className="text-lg font-semibold text-gray-800">Personal Details</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Full Name</p>
                <p className="font-medium">{studentInfo.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Gender</p>
                <p className="font-medium">{studentInfo.gender}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                <p className="font-medium">{new Date(studentInfo.dob).toLocaleDateString()}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Roll Number</p>
                <p className="font-medium">{studentInfo.rollNo}</p>
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-md p-6 h-full">
            <div className="flex items-center mb-4">
              <MapPin className="h-5 w-5 text-[#4E77BB] mr-2 flex-shrink-0" />
              <h3 className="text-lg font-semibold text-gray-800">Contact Details</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Email Address</p>
                <p className="font-medium overflow-hidden text-ellipsis">{studentInfo.email}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Mobile Number</p>
                <p className="font-medium">{studentInfo.mobile}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">City</p>
                <p className="font-medium">{studentInfo.city}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">State</p>
                <p className="font-medium">{studentInfo.state}</p>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 mb-1">Complete Address</p>
                <p className="font-medium">{studentInfo.address}, {studentInfo.city}, {studentInfo.state}</p>
              </div>
            </div>
          </div>
          
          {/* Parent Details */}
          <div className="bg-white rounded-xl shadow-md p-6 h-full">
            <div className="flex items-center mb-4">
              <Users className="h-5 w-5 text-[#4E77BB] mr-2 flex-shrink-0" />
              <h3 className="text-lg font-semibold text-gray-800">Parent Details</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Father's Name</p>
                <p className="font-medium">{parentInfo.fatherName}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Mother's Name</p>
                <p className="font-medium">{parentInfo.motherName}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Father's Mobile</p>
                <p className="font-medium">{parentInfo.fatherMobile}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Parent's Email</p>
                <p className="font-medium overflow-hidden text-ellipsis">{parentInfo.parentEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicInfo;