import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const colors = ["bg-blue-500", "bg-green-500", "bg-red-500", "bg-purple-500", "bg-yellow-500"];

const CourseCards = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:4000/server/courses/getall/");
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      }
    };

    fetchCourses();
  }, []);

  const handleNavigate = (courseName) => {
    // Convert course name to lowercase and replace spaces with dashes if needed
    const course = courseName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/dashboard/all-student/${course}`);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100 flex flex-wrap gap-6 justify-center">
      <h1 className="text-3xl font-bold text-gray-800 w-full text-center mb-6">Courses</h1>

      {courses.map((course, index) => (
        <motion.div
          key={course._id}
          className={`w-64 h-40 rounded-xl text-white flex flex-col justify-center items-center shadow-lg cursor-pointer ${colors[index % colors.length]}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h2 className="text-2xl font-semibold">{course.name}</h2>
          <button
            onClick={() => handleNavigate(course.name)} // ✅ Dynamic navigation
            className="mt-auto mb-3 px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Manage Course
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default CourseCards;
