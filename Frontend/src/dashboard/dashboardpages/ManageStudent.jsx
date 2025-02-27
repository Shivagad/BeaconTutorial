// import React, { useState, useEffect } from "react";
// import { PlusCircle, Edit, Trash2 } from "lucide-react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import AddStudentModal from "../Student/AddStudent";
// import EditStudentModal from "../Student/EditStudent";
// import DeleteStudentModal from "../Student/DeleteStudent";

// const StudentTable = () => {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [editStudentId, setEditStudentId] = useState(null);
//   const [deleteStudentId, setDeleteStudentId] = useState(null);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/server/student/stu/");
//       setStudents(response.data || []);
//       setFilteredStudents(response.data || []);
//     } catch (error) {
//       setStudents([]);
//       setFilteredStudents([]);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setFilteredStudents(students);
//       return;
//     }

//     const query = searchQuery.toLowerCase().trim();

//     const filtered = students.filter((student) => {
//       return (
//         (student.name && student.name.toLowerCase().includes(query)) ||
//         (student.email && student.email.toLowerCase().includes(query)) ||
//         (student.course?.name && student.course.name.toLowerCase().includes(query))
//       );
//     });

//     setFilteredStudents(filtered);
//   }, [searchQuery, students]);

//   useEffect(() => {
//     if (editStudentId) {
//       setIsEditModalOpen(true);
//     }
//   }, [editStudentId]);

//   const setToast = (msg) => {
//     msg.success ? toast.success(msg.message) : toast.error(msg.message);
//     fetchStudents();
//   };

//   // Group students by course
//   const groupedStudents = filteredStudents.reduce((acc, student) => {
//     const courseName = student.course?.name || "Unassigned";
//     if (!acc[courseName]) {
//       acc[courseName] = [];
//     }
//     acc[courseName].push(student);
//     return acc;
//   }, {});

//   return (
//     <div className="p-6 ml-64">
//       <ToastContainer position="top-right" autoClose={3000} />

//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Student List</h1>
//         <button
//           onClick={() => setIsAddModalOpen(true)}
//           className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           <PlusCircle className="w-5 h-5 mr-2" />
//           Add Student
//         </button>
//       </div>

//       <input
//         type="text"
//         placeholder="Search students..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="mb-4 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//       />

//       <div className="overflow-x-auto">
//         {Object.keys(groupedStudents).length > 0 ? (
//           Object.entries(groupedStudents).map(([courseName, students]) => (
//             <div key={courseName} className="mb-8">
//               <h2 className="text-xl font-semibold text-gray-700 mb-4 bg-gray-200 px-4 py-2 rounded">
//                 {courseName}
//               </h2>
//               <table className="min-w-full bg-white shadow-md rounded-lg mb-6">
//                 <thead>
//                   <tr className="bg-gray-100 border-b">
//                     <th className="py-3 px-6 text-left">Name</th>
//                     <th className="py-3 px-6 text-left">Email</th>
//                     <th className="py-3 px-6 text-left">Mobile</th>
//                     <th className="py-3 px-6 text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map((student) => (
//                     <tr key={student._id} className="border-b hover:bg-gray-50">
//                       <td className="py-3 px-6">{student.name}</td>
//                       <td className="py-3 px-6">{student.email}</td>
//                       <td className="py-3 px-6">{student.mobile}</td>
//                       <td className="py-3 px-6 text-center">
//                         <button
//                           onClick={() => setEditStudentId(student._id)}
//                           className="text-blue-600 hover:text-blue-800 mr-4"
//                         >
//                           <Edit className="w-5 h-5 inline-block" />
//                         </button>
//                         <button
//                           onClick={() => {
//                             setDeleteStudentId(student._id);
//                             setIsDeleteModalOpen(true);
//                           }}
//                           className="text-red-600 hover:text-red-800"
//                         >
//                           <Trash2 className="w-5 h-5 inline-block" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No students found.</p>
//         )}
//       </div>

//       <AddStudentModal
//         setToast={setToast}
//         isOpen={isAddModalOpen}
//         onClose={() => setIsAddModalOpen(false)}
//       />

//       <EditStudentModal
//         setToast={setToast}
//         isEditOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         studentId={editStudentId}
//       />

//       <DeleteStudentModal
//         setToast={setToast}
//         isDeleteOpen={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         id={deleteStudentId}
//       />
//     </div>
//   );
// };

// export default StudentTable;
