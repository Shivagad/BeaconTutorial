import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import axios from 'axios';


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
          console.log("Course Details Response:", response.data);
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
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Student Information</h2>

      <div className="bg-white rounded-lg shadow-md p-6 md:p-8 space-y-8">

        {/* Personal Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="text-gray-600 block mb-1">Name</label>
                <p className="font-medium text-lg">{studentInfo.name}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Roll No</label>
                <p className="font-medium text-lg">{studentInfo.rollNo}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Gender</label>
                <p className="font-medium text-lg">{studentInfo.gender}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Date of Birth</label>
                <p className="font-medium text-lg">{new Date(studentInfo.dob).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Admission Year</label>
                <p className="font-medium text-lg">{studentInfo.admissionYear}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Course</label>
                <p className="font-medium text-lg">{courseDetails}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-600 block mb-1">Email</label>
                <p className="font-medium text-lg">{studentInfo.email}</p>
              </div>
             
              <div>
                <label className="text-gray-600 block mb-1">Mobile</label>
                <p className="font-medium text-lg">{studentInfo.mobile}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">State</label>
                <p className="font-medium text-lg">{studentInfo.state}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">City</label>
                <p className="font-medium text-lg">{studentInfo.city}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Address</label>
                <p className="font-medium text-lg">{studentInfo.address}, {studentInfo.city}, {studentInfo.state}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Parent Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Parent Details</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="text-gray-600 block mb-1">Father's Name</label>
                <p className="font-medium text-lg">{parentInfo.fatherName}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Father's Mobile</label>
                <p className="font-medium text-lg">{parentInfo.fatherMobile}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-600 block mb-1">Mother's Name</label>
                <p className="font-medium text-lg">{parentInfo.motherName}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Parent's Email</label>
                <p className="font-medium text-lg">{parentInfo.parentEmail}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BasicInfo;
