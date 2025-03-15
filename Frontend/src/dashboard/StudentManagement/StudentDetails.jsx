import React, { useState, useEffect } from "react";
import { PlusCircle, Upload, Edit, Trash2, Download, } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddStudentModal from "../Student/AddStudent";
import EditStudentModal from "../Student/EditStudent";
import DeleteStudentModal from "../Student/DeleteStudent";
import AddResultModal from "../Student/AddResultModal";

import { useParams } from "react-router-dom";

const StudentTable = () => {
  const {course}=useParams()
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
      console.log(allStudents);
      // Filter only CET students (based on course name)
      const cetStudents = allStudents.filter(
        (student) =>
          student.course?.name?.toLowerCase() === course.toLowerCase()
      );
      

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

      // Clear file input
      setCsvFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "CSV upload failed.");
    }
  };

  // Reset file input after uploading
  useEffect(() => {
    if (!csvFile) {
      document.querySelector("#csvInput").value = "";
    }
  }, [csvFile]);

  const handleDownloadCsv = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/server/student/download-csv/${course}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${course}_students.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error("Failed to download CSV.");
    }
  };

  const handleDeleteAll = async () => {
    const isConfirmed = window.confirm(`Are you sure you want to delete all students from ${course.toUpperCase()}?`);
    
    if (!isConfirmed) return;
  
    try {
      await axios.delete(`http://localhost:4000/server/student/delete-all/${course}`);
      toast.success("All students deleted successfully.");
      fetchStudents();
    } catch (error) {
      toast.error("Failed to delete students.");
    }
  };
  const [isAddResultModalOpen, setIsAddResultModalOpen] = useState(false);

  const openAddResultModal = () => setIsAddResultModalOpen(true);
  const closeAddResultModal = () => setIsAddResultModalOpen(false);
  
  const handleAddResult = (resultData) => {
    console.log("Result added:", resultData);
    toast.success("Result added successfully!");
    fetchStudents();
  };
  

  return (
    <div className="p-6 ml-64">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{course.toUpperCase()} Students</h1>
        
        <div className="flex space-x-4">
          <button onClick={handleDownloadCsv} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Download className="w-5 h-5 mr-2" /> Download CSV
          </button>

          <button onClick={handleDeleteAll} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
            <Trash2 className="w-5 h-5 mr-2" /> Delete All
          </button>

          <button onClick={openAddResultModal} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
  Add Result
</button>

        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Student
          </button>

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
          <table className="min-w-full bg-white shadow-md rounded-lg mb-6 border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-2 border border-gray-300 text-left">Name</th>
                <th className="py-3 px-2 border border-gray-300 text-left">Roll No</th>
                <th className="py-3 px-2 border border-gray-300 text-left">Father's Name</th>
                <th className="py-3 px-2 border border-gray-300 text-left">Mother's Name</th>
                <th className="py-3 px-2 border border-gray-300 text-left">Parent Email</th>
                <th className="py-3 px-2 border border-gray-300 text-left">Email</th>
                <th className="py-3 px-2 border border-gray-300 text-left">Mobile</th>
                <th className="py-3 px-2 border border-gray-300 text-left">Father's Mobile</th>
                <th className="py-3 px-2 border border-gray-300 text-left">Address</th>
                <th className="py-3 px-2 border border-gray-300 text-left">State</th>
                <th className="py-3 px-2 border border-gray-300 text-left">City</th>
                <th className="py-3 px-2 border border-gray-300 text-left">Gender</th>
                <th className="py-3 px-2 border border-gray-300 text-left">DOB</th>
                <th className="py-3 px-2 border border-gray-300 text-left">Admission Year</th>
                <th className="py-3 px-2 border border-gray-300 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="py-3 px-2 border border-gray-300">{student.name}</td>
                  <td className="py-3 px-2 border border-gray-300">{student.rollNo}</td>
                  <td className="py-3 px-2 border border-gray-300">{student.fatherName}</td>
                  <td className="py-3 px-2 border border-gray-300">{student.motherName}</td>
                  <td className="py-3 px-2 border border-gray-300">{student.parentEmail}</td>
                  <td className="py-3 px-2 border border-gray-300">{student.email}</td>
                  <td className="py-3 px-2 border border-gray-300">{student.mobile}</td>
                  <td className="py-3 px-2 border border-gray-300">{student.fatherMobile}</td>
                  <td className="py-3 px-2 border border-gray-300">{student.address}</td>
                  <td className="py-3 px-2 border border-gray-300">{student.state}</td>
                  <td className="py-3 px-2 border border-gray-300">{student.city}</td>
                  <td className="py-3 px-2 border border-gray-300">{student.gender}</td>
                  <td className="py-3 px-2 border border-gray-300">
                    {student.dob ? new Date(student.dob).toLocaleDateString() : ""}
                  </td>
                  <td className="py-3 px-2 border border-gray-300">{student.admissionYear}</td>
                 
                  <td className="py-3 px-2 border border-gray-300 text-center">
                    <button
                      onClick={() => setEditStudentId(student._id)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
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
          <p className="text-center text-gray-500">No {course} students found.</p>
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

<AddResultModal 
  isOpen={isAddResultModalOpen} 
  onClose={closeAddResultModal} 
  setToast={setToast}
/>

    </div>
  );
};

export default StudentTable;
