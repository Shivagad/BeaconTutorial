import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminScholarshipTable = () => {
  const [scholarships, setScholarships] = useState([]);
  const fetchScholarships = () => {
    axios
      .get("https://beacon-tutorial.vercel.app/server/scholarship/getall")
      .then((response) => {
        setScholarships(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching scholarships:", error);
      });
  };

  useEffect(() => {
    fetchScholarships();
  }, []);
  const handleDownloadCSV = () => {
    window.open("https://beacon-tutorial.vercel.app/server/scholarship/export", "_blank");
  };

  const handleDeleteEntry = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (!confirmDelete) return;
    
    try {
      await axios.delete(`https://beacon-tutorial.vercel.app/server/scholarship/${id}`);
      // Remove the deleted entry from state
      setScholarships(
        scholarships.filter((scholarship) => scholarship._id !== id)
      );
    } catch (error) {
      console.error("Error deleting scholarship entry:", error);
    }
  };

  // Delete all scholarship entries with confirmation
  const handleDeleteAll = async () => {
    const confirmDeleteAll = window.confirm(
      "Are you sure you want to delete all scholarship entries?"
    );
    if (!confirmDeleteAll) return;

    try {
      await axios.delete("https://beacon-tutorial.vercel.app/server/scholarship/deleteAll");
      // Clear the state
      setScholarships([]);
    } catch (error) {
      console.error("Error deleting all scholarship entries:", error);
    }
  };

  return (
    <div className="ml-64 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Scholarship Entries
      </h1>

      {/* Action Buttons */}
      <div className="mb-4 flex justify-between">
        <div>
          <button
            onClick={handleDownloadCSV}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
          >
            Download CSV
          </button>
        </div>
        <div>
          <button
            onClick={handleDeleteAll}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete All
          </button>
        </div>
      </div>

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
              <th className="px-4 py-2 border border-blue-500">School Name</th>
              <th className="px-4 py-2 border border-blue-500">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {scholarships.length > 0 ? (
              scholarships.map((scholarship, index) => (
                <tr key={scholarship._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-400">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border border-gray-400">
                    {scholarship.firstName}
                  </td>
                  <td className="px-4 py-2 border border-gray-400">
                    {scholarship.lastName}
                  </td>
                  <td className="px-4 py-2 border border-gray-400">
                    {new Date(scholarship.birthday).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-400">
                    {scholarship.gender}
                  </td>
                  <td className="px-4 py-2 border border-gray-400">
                    {scholarship.email}
                  </td>
                  <td className="px-4 py-2 border border-gray-400">
                    {scholarship.address}
                  </td>
                  <td className="px-4 py-2 border border-gray-400">
                    {scholarship.phone}
                  </td>
                  <td className="px-4 py-2 border border-gray-400">
                    {scholarship.educationMode}
                  </td>
                  <td className="px-4 py-2 border border-gray-400">
                    {scholarship.marks}
                  </td>
                  <td className="px-4 py-2 border border-gray-400">
                    {scholarship.board}
                  </td>
                  <td className="px-4 py-2 border border-gray-400">
                    {scholarship.SchoolName}
                  </td>
                  <td className="px-4 py-2 border border-gray-400">
                    <button
                      onClick={() => handleDeleteEntry(scholarship._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="12"
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
