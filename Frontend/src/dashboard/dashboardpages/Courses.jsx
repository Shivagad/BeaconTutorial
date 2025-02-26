import React, { useState, useEffect } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCourseModal from "../Courses/AddCourse";
import EditCourseModal from "../Courses/EditCourse";
import DeleteCourseModal from "../Courses/DeleteCourse";

const CourseManagement = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);
  const [deleteCourseId, setDeleteCourseId] = useState(null);
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:4000/server/courses/");
      if (response.data) {
        setCourses(response.data);
      } else {
        setCourses([]);
      }
    } catch (error) {
      setCourses([]);
      console.error("Error fetching courses data:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const setToast = (msg) => {
    msg.success ? toast.success(msg.message) : toast.error(msg.message);
    fetchCourses();
  };

  const openEditModal = (id) => {
    setEditCourseId(id);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (id) => {
    setDeleteCourseId(id);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="p-6 ml-64">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Course Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Course
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.length !== 0 &&
          courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{course.name}</h3>
                  <h3 className="text-lg font-semibold">Code: {course.code}</h3>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(course._id)}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => openDeleteModal(course._id)}
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <AddCourseModal
        setToast={setToast}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <EditCourseModal
        setToast={setToast}
        isEditOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        id={editCourseId}
      />

      <DeleteCourseModal
        setToast={setToast}
        isDeleteOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        id={deleteCourseId}
      />
    </div>
  );
};

export default CourseManagement;