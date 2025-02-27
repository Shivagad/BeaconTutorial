import React, { useState, useEffect } from "react";
import { PlusCircle, Upload, Edit, Trash2 } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddStudentModal from "../Student/AddStudent";
import EditStudentModal from "../Student/EditStudent";
import DeleteStudentModal from "../Student/DeleteStudent";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);
  const [deleteStudentId, setDeleteStudentId] = useState(null);
  const [csvFile, setCsvFile] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/server/student/stu/");
      const allStudents = response.data || [];

      // Filter only CET students
      const cetStudents = allStudents.filter(student => student.course?.name?.toLowerCase() === "cet");

      setStudents(cetStudents);
      setFilteredStudents(cetStudents);
    } catch (error) {
      setStudents([]);
      setFilteredStudents([]);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredStudents(students);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = students.filter((student) =>
      (student.name && student.name.toLowerCase().includes(query)) ||
      (student.email && student.email.toLowerCase().includes(query))
    );

    setFilteredStudents(filtered);
  }, [searchQuery, students]);

  useEffect(() => {
    if (editStudentId) {
      setIsEditModalOpen(true);
    }
  }, [editStudentId]);

  const setToast = (msg) => {
    msg.success ? toast.success(msg.message) : toast.error(msg.message);
    fetchStudents();
  };

  // Handle CSV file upload
  // Handle CSV file upload
const handleCsvUpload = async () => {
  if (!csvFile) {
    toast.error("Please select a CSV file.");
    return;
  }

  const formData = new FormData();
  formData.append("file", csvFile);

  try {
    const response = await axios.post("http://localhost:4000/server/student/upload-csv/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success(response.data.message);
    fetchStudents(); // Refresh students list

    // ✅ Clear the file input field after successful upload
    setCsvFile(null);
  } catch (error) {
    toast.error(error.response?.data?.message || "CSV upload failed.");
  }
};

// Reset file input visually after uploading
useEffect(() => {
  if (!csvFile) {
    document.querySelector("#csvInput").value = "";
  }
}, [csvFile]);


  return (
    <div className="p-6 ml-64">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">CET Students</h1>

        <div className="flex space-x-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Student
          </button>

          {/* CSV Upload */}
   {/* CSV Upload */}
<label className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
  <Upload className="w-5 h-5 mr-2" />
  Upload CSV
  <input
    id="csvInput"
    type="file"
    accept=".csv"
    className="hidden"
    onChange={(e) => setCsvFile(e.target.files[0])}
  />
</label>

{/* Show "Upload Now" only when a file is selected */}
{csvFile && (
  <button
    onClick={handleCsvUpload}
    className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
  >
    Upload Now
  </button>
)}

        </div>
      </div>

      <input
        type="text"
        placeholder="Search students..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="overflow-x-auto">
        {filteredStudents.length > 0 ? (
          <table className="min-w-full bg-white shadow-md rounded-lg mb-6">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Mobile</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{student.name}</td>
                  <td className="py-3 px-6">{student.email}</td>
                  <td className="py-3 px-6">{student.mobile}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => setEditStudentId(student._id)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      <Edit className="w-5 h-5 inline-block" />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteStudentId(student._id);
                        setIsDeleteModalOpen(true);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5 inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No CET students found.</p>
        )}
      </div>

      <AddStudentModal
        setToast={setToast}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <EditStudentModal
        setToast={setToast}
        isEditOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        studentId={editStudentId}
      />

      <DeleteStudentModal
        setToast={setToast}
        isDeleteOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        id={deleteStudentId}
      />
    </div>
  );
};

export default StudentTable;
