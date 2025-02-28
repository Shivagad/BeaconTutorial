import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import fs from "fs";
import csv from "csv-parser";
import Student from "../Models/Student.js";
import Course from "../Models/Course.js";

dotenv.config();

// Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("course", "name");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch students" });
  }
};

// Get a single student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("course", "name");
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch student" });
  }
};

// Create a new student
export const createStudent = async (req, res) => {
  try {
    const { 
      name, 
      fatherName, 
      motherName, 
      parentEmail, 
      email, 
      password, 
      mobile, 
      fatherMobile, 
      address, 
      state, 
      city, 
      gender, 
      dob, 
      admissionYear, 
      course 
    } = req.body;
    console.log(req.body);

    const courseExists = await Course.findOne({ name: course });
    if (!courseExists) {
      return res.status(400).json({ success: false, message: "Course does not exist" });
    }
    const courseId = courseExists._id;

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({ 
      name, 
      fatherName, 
      motherName, 
      parentEmail, 
      email, 
      password: hashedPassword, 
      mobile, 
      fatherMobile, 
      address, 
      state, 
      city, 
      gender, 
      dob, 
      admissionYear, 
      course: courseId 
    });

    await student.save();
    res.status(201).json({ success: true, message: "Student created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Student creation failed", error: error.message });
  }
};

// Update a student
export const updateStudent = async (req, res) => {
  try {
    const { 
      name, 
      fatherName, 
      motherName, 
      parentEmail, 
      email, 
      mobile, 
      fatherMobile, 
      address, 
      state, 
      city, 
      gender, 
      dob, 
      admissionYear, 
      course, 
      password 
    } = req.body;

    const courseExists = await Course.findById(course);
    if (!courseExists) {
      return res.status(400).json({ success: false, message: "Invalid course ID" });
    }

    let updateData = {
      name,
      fatherName,
      motherName,
      parentEmail,
      email,
      mobile,
      fatherMobile,
      address,
      state,
      city,
      gender,
      dob,
      admissionYear,
      course: courseExists._id
    };

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
    if (!req.file) {
      return res.status(400).json({ success: false, message: "CSV file is required" });
    }

    const students = [];
    const filePath = req.file.path;
    const readStream = fs.createReadStream(filePath).pipe(csv());

    for await (const row of readStream) {
      // Expect CSV headers to match field names (adjust as needed)
      const { 
        name, 
        fatherName, 
        motherName, 
        parentEmail, 
        email, 
        password, 
        mobile, 
        fatherMobile, 
        address, 
        state, 
        city, 
        gender, 
        dob, 
        admissionYear, 
        course 
      } = row;
      console.log("Processing:", row);

      const existingStudent = await Student.findOne({ $or: [{ email }, { mobile }] });
      if (existingStudent) {
        console.warn(`Student with email "${email}" or mobile "${mobile}" already exists. Skipping.`);
        continue;
      }

      const courseExists = await Course.findOne({ name: course });
      if (!courseExists) {
        console.error(`Course "${course}" not found. Skipping.`);
        continue;
      }
      const courseId = courseExists._id;
      const hashedPassword = await bcrypt.hash(password, 10);

      students.push({
        name,
        fatherName,
        motherName,
        parentEmail,
        email,
        password: hashedPassword,
        mobile,
        fatherMobile,
        address,
        state,
        city,
        gender,
        dob: new Date(dob),
        admissionYear: Number(admissionYear),
        course: courseId
      });
    }

    fs.unlinkSync(filePath);

    if (students.length > 0) {
      const insertedStudents = await Student.insertMany(students);
      console.log("Inserted Students:", insertedStudents);
      res.status(201).json({ success: true, message: "CSV uploaded successfully", students: insertedStudents });
    } else {
      res.status(400).json({ success: false, message: "No valid students were added. Check CSV data." });
    }
  } catch (error) {
    console.error("CSV upload failed:", error);
    res.status(500).json({ success: false, message: "CSV upload failed", error: error.message });
  }
};

// Student Login
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Student.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Incorrect email or password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "2h" });
    res.status(200).json({ success: true, token, user, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
};



