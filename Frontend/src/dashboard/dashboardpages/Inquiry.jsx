import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminInquiryTable = () => {
  const [inquiries, setInquiries] = useState([]);

  const fetchInquiries = () => {
    axios
      .get("https://beacon-tutorial.vercel.app/server/getinquiries")
      .then((response) => {
        console.log(response.data.data)
        setInquiries(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching inquiries:", error);
      });
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDownloadCSV = () => {
    window.open("https://beacon-tutorial.vercel.app/server/inquiry/export", "_blank");
  };

  const handleDeleteEntry = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://beacon-tutorial.vercel.app/server/inquiry/${id}`);
      setInquiries(inquiries.filter((inquiry) => inquiry._id !== id));
    } catch (error) {
      console.error("Error deleting inquiry entry:", error);
    }
  };

  const handleDeleteAll = async () => {
    const confirmDeleteAll = window.confirm("Are you sure you want to delete all inquiries?");
    if (!confirmDeleteAll) return;

    try {
      await axios.delete("https://beacon-tutorial.vercel.app/server/inquiry/deleteAll");
      setInquiries([]);
    } catch (error) {
      console.error("Error deleting all inquiries:", error);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="ml-64 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">Inquiry Entries</h1>

      <div className="mb-4 flex justify-between">
        <button
          onClick={handleDownloadCSV}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
        >
          Download CSV
        </button>
        <button
          onClick={handleDeleteAll}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete All
        </button>
      </div>

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
              <th className="px-4 py-2 border border-blue-500">Inquire Branch</th>
              <th className="px-4 py-2 border border-blue-500">Message</th>
              <th className="px-4 py-2 border border-blue-500">Date & Time</th>
              <th className="px-4 py-2 border border-blue-500">Actions</th>
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
                  <td className="px-4 py-2 border border-gray-400">{inquiry.branch}</td>
                  <td className="px-4 py-2 border border-gray-400">{inquiry.message}</td>
                  <td className="px-4 py-2 border border-gray-400">{formatDateTime(inquiry.createdAt)}</td>
                  <td className="px-4 py-2 border border-gray-400">
                    <button
                      onClick={() => handleDeleteEntry(inquiry._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="16" className="px-4 py-2 border border-gray-300 text-center text-gray-500">
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