import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";

import {
  Login,
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
  uploadStudentsCSV,
  deleteAllCourseStudent,
  downloadCourseCSV
} from "../Controller/Student.js";

import { sendOTPEmail, sendScholarregSuccessfull,ContactUsEmail } from "../Controller/EmailService.js";

const router = express.Router();

const uploadDir = "/tmp/uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Email Routes
router.post('/otp-email', sendOTPEmail);
router.post('/scholarregsuccess', sendScholarregSuccessfull);
router.post('/contactusemail',ContactUsEmail);

// Student Routes
router.post('/login-student', Login);
router.get("/stu/", getStudents);
router.get("/byid/:id", getStudentById);
router.post("/createstu/", createStudent);
router.put("/stu/:id", updateStudent);
router.delete("/stu/:id", deleteStudent);
router.post("/upload-csv/", upload.single("file"), uploadStudentsCSV);
router.delete("/delete-all/:course", deleteAllCourseStudent);
router.get("/download-csv/:course", downloadCourseCSV);


import {checkStudentEmail,resetStudentPassword} from '../Controller/Student.js';
router.post('/check/email',checkStudentEmail)
router.post('/reset-password',resetStudentPassword)
export default router;
