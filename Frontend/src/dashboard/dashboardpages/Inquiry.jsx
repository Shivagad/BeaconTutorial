import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminInquiryTable = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    axios
      .get("https://beacon-tutorial.vercel.app/server/getinquiries")
      .then((response) => {
        setInquiries(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching inquiries:", error);
      });
  }, []);

  return (
    <div className="ml-64 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Inquiry Entries
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border-collapse border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 border border-blue-500">Sr No</th>
              <th className="px-4 py-2 border border-blue-500">First Name</th>
              <th className="px-4 py-2 border border-blue-500">Last Name</th>
              <th className="px-4 py-2 border border-blue-500">Phone</th>
              <th className="px-4 py-2 border border-blue-500">Email</th>
              <th className="px-4 py-2 border border-blue-500">Gender</th>
              <th className="px-4 py-2 border border-blue-500">Address</th>
              <th className="px-4 py-2 border border-blue-500">City</th>
              <th className="px-4 py-2 border border-blue-500">State</th>
              <th className="px-4 py-2 border border-blue-500">Previous Standard</th>
              <th className="px-4 py-2 border border-blue-500">Marks</th>
              <th className="px-4 py-2 border border-blue-500">Inquiry For</th>
              <th className="px-4 py-2 border border-blue-500">Message</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {inquiries.length > 0 ? (
              inquiries.map((inquiry, index) => (
                <tr key={inquiry._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-400">{index + 1}</td>
                  <td className="px-4 py-2 border border-gray-400">{inquiry.firstName}</td>
                  <td className="px-4 py-2 border border-gray-400">{inquiry.lastName}</td>
                  <td className="px-4 py-2 border border-gray-400">{inquiry.phone}</td>
                  <td className="px-4 py-2 border border-gray-400">{inquiry.email}</td>
                  <td className="px-4 py-2 border border-gray-400">{inquiry.gender}</td>
                  <td className="px-4 py-2 border border-gray-400">{inquiry.address}</td>
                  <td className="px-4 py-2 border border-gray-400">{inquiry.city}</td>
                  <td className="px-4 py-2 border border-gray-400">{inquiry.state}</td>
                  <td className="px-4 py-2 border border-gray-400">{inquiry.previousStandard}</td>
                  <td className="px-4 py-2 border border-gray-400">{inquiry.previousStandardMarks}</td>
                  <td className="px-4 py-2 border border-gray-400">{inquiry.inquiryFor}</td>
                  <td className="px-4 py-2 border border-gray-400">{inquiry.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="14"
                  className="px-4 py-2 border border-gray-300 text-center text-gray-500"
                >
                  No inquiry entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInquiryTable;
