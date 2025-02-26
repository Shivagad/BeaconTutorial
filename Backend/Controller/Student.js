import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import fs from "fs";
import csv from "csv-parser";
import mongoose from "mongoose";
import Student from "../Models/Student.js";
import Course from "../Models/Course.js";

dotenv.config();

// Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("course");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch students" });
  }
};

// Get a single student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("course");
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch student" });
  }
};

// Create a new student
export const createStudent = async (req, res) => {
  try {
    const { name, email, password, mobile, course } = req.body;
    console.log(req.body);

    if (!mongoose.Types.ObjectId.isValid(course)) {
      return res.status(400).json({ success: false, message: "Invalid course ID" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({ name, email, password: hashedPassword, mobile, course });
    await student.save();
    console.log("added");
    res.status(201).json({ success: true, message: "Student created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Student creation failed" });
  }
};

// Update student details
export const updateStudent = async (req, res) => {
  try {
    const { name, email, mobile, course, password } = req.body;
    let updateData = { name, email, mobile, course };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10); 
    }

    const student = await Student.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!student) return res.status(404).json({ success: false, message: "Student not found" });

    res.status(200).json({ success: true, message: "Student updated successfully", student });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update student" });
  }
};

// Delete a student
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });

    res.status(200).json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete student" });
  }
};

// Upload students via CSV
export const uploadStudentsCSV = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "CSV file is required" });

    const students = [];
    const filePath = req.file.path;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        students.push({
          name: row.name,
          email: row.email,
          password: row.password,
          mobile: row.mobile,
          course: row.course,
        });
      })
      .on("end", async () => {
        fs.unlinkSync(filePath);

        for (let student of students) {
          student.password = await bcrypt.hash(student.password, 10); // Hash password
        }

        await Student.insertMany(students);
        res.status(201).json({ success: true, message: "CSV uploaded successfully" });
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "CSV upload failed" });
  }
};

// Student Login
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Student.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Incorrect email or password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.status(200).json({ success: true, token, user, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
};
