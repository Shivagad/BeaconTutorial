import Course from "../Models/Course.js";
import mongoose from "mongoose";


export const getCourses = async (req, res) => {
  try {
    // console.log("Fetching courses..."); // ✅ Debugging step

    const courses = await Course.find().populate("students exams");
    // console.log("Courses fetched:", courses); // ✅ Debugging step

    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("Error fetching courses:", error); // ✅ Capture backend errors

    res.status(500).json({ success: false, message: "Failed to fetch courses", error: error.message });
  }
};



export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid course ID" });
    }

    const course = await Course.findById(id).populate("students exams");

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch course" });
  }
};


export const createCourse = async (req, res) => {
  try {
    const { name, code } = req.body;


    const existingCourse = await Course.findOne({ code });
    if (existingCourse) {
      return res.status(400).json({ success: false, message: "Course code already exists" });
    }

    const course = new Course({ name, code });
    await course.save();

    res.status(201).json({ success: true, message: "Course created successfully", course });
  } catch (error) {
    res.status(500).json({ success: false, message: "Course creation failed" });
  }
};


export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid course ID" });
    }

    const course = await Course.findByIdAndUpdate(
      id,
      { name, code },
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ success: false, message: "Course update failed" });
  }
};


export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid course ID" });
    }

    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Course deletion failed" });
  }
};
