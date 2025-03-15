import React from "react"

const BasicInfo = () => {
  const studentInfo = {
    name: "John Doe",
    age: 18,
    grade: "12th",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    contactNo: "+1234567890",
    email: "john.doe@example.com",
    address: "123 Education Street, Learning City",
    joinDate: "2024-01-15"
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Student Information</h2>

      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-600 block mb-1">Name</label>
                <p className="font-medium text-lg">{studentInfo.name}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Age</label>
                <p className="font-medium text-lg">{studentInfo.age} years</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Grade</label>
                <p className="font-medium text-lg">{studentInfo.grade}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-600 block mb-1">Email</label>
                <p className="font-medium text-lg">{studentInfo.email}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Phone</label>
                <p className="font-medium text-lg">{studentInfo.contactNo}</p>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Address</label>
                <p className="font-medium text-lg">{studentInfo.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Enrolled Subjects</h3>
          <div className="flex flex-wrap gap-3">
            {studentInfo.subjects.map((subject, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-base font-medium"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicInfo
