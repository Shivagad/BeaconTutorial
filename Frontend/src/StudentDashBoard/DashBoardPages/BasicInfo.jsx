import React from "react"
import { useAuth } from "../../Context/AuthProvider"

function getDate(d){
    const date = new Date(d);
const options = { day: 'numeric', month: 'short', year: 'numeric' };
const formattedDate = date.toLocaleDateString('en-GB', options).toLowerCase(); 
    return formattedDate
}

const BasicInfo = () => {
    const {currentUser}=useAuth();
    console.log(currentUser);
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 px-5 mt-4">Student Information</h2>

      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-600 block mb-1">Name</label>
                <p className="font-medium text-lg">{currentUser.name}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Father's Name</label>
                <p className="font-medium text-lg">{currentUser.fatherName}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Mother's Name</label>
                <p className="font-medium text-lg">{currentUser.motherName}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Date of Birth</label>
                <p className="font-medium text-lg">{getDate(currentUser.dob)}</p>
              </div>
            </div>
          </div>
        
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-600 block mb-1">Student's Email</label>
                <p className="font-medium text-lg">{currentUser.email}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Parent's Email</label>
                <p className="font-medium text-lg">{currentUser.parentEmail}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Student's Phone</label>
                <p className="font-medium text-lg">{currentUser.mobile}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Parent's Phone</label>
                <p className="font-medium text-lg">{currentUser.fatherMobile}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Address</label>
                <p className="font-medium text-lg">{currentUser.address}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Other Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-600 block mb-1">Admission Year</label>
                <p className="font-medium text-lg">{currentUser.admissionYear}</p>
              </div>
              {/* <div>
                <label className="text-gray-600 block mb-1">Parent's Email</label>
                <p className="font-medium text-lg">{currentUser.parentEmail}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Student's Phone</label>
                <p className="font-medium text-lg">{currentUser.mobile}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Parent's Phone</label>
                <p className="font-medium text-lg">{currentUser.fatherMobile}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Address</label>
                <p className="font-medium text-lg">{currentUser.address}</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicInfo
