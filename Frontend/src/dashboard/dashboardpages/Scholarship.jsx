import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminScholarshipTable = () => {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/server/scholarship/getall")
      .then((response) => {
        setScholarships(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching scholarships:", error);
      });
  }, []);

  return (
    <div className="ml-64 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Scholarship Entries
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border-collapse border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 border border-blue-500">Sr No</th>
              <th className="px-4 py-2 border border-blue-500">First Name</th>
              <th className="px-4 py-2 border border-blue-500">Last Name</th>
              <th className="px-4 py-2 border border-blue-500">Birthday</th>
              <th className="px-4 py-2 border border-blue-500">Gender</th>
              <th className="px-4 py-2 border border-blue-500">Email</th>
              <th className="px-4 py-2 border border-blue-500">Address</th>
              <th className="px-4 py-2 border border-blue-500">Phone</th>
              <th className="px-4 py-2 border border-blue-500">Education Mode</th>
              <th className="px-4 py-2 border border-blue-500">Marks</th>
              <th className="px-4 py-2 border border-blue-500">Board</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {scholarships.length > 0 ? (
              scholarships.map((scholarship, index) => (
                <tr key={scholarship._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-400">{index + 1}</td>
                  <td className="px-4 py-2 border border-gray-400">{scholarship.firstName}</td>
                  <td className="px-4 py-2 border border-gray-400">{scholarship.lastName}</td>
                  <td className="px-4 py-2 border border-gray-400">
                    {new Date(scholarship.birthday).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-400">{scholarship.gender}</td>
                  <td className="px-4 py-2 border border-gray-400">{scholarship.email}</td>
                  <td className="px-4 py-2 border border-gray-400">{scholarship.address}</td>
                  <td className="px-4 py-2 border border-gray-400">{scholarship.phone}</td>
                  <td className="px-4 py-2 border border-gray-400">{scholarship.educationMode}</td>
                  <td className="px-4 py-2 border border-gray-400">{scholarship.marks}</td>
                  <td className="px-4 py-2 border border-gray-400">{scholarship.board}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="11"
                  className="px-4 py-2 border border-gray-300 text-center text-gray-500"
                >
                  No scholarship entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminScholarshipTable;
