import express from "express";
const router = express.Router();
import multer from "multer";


import {sendOTPEmail,sendScholarregSuccessfull} from '../Controller/EmailService.js';
router.post('/otp-email',sendOTPEmail);
router.post('/scholarregsuccess',sendScholarregSuccessfull);

import { Login,getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    uploadStudentsCSV } from "../Controller/Student.js";

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "uploads/"); 
        },
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        }
      });
      const upload = multer({ storage });
// router.post('/signup-student',Signup);
router.post('/login-student',Login);
router.get("/stu/", getStudents);
router.post("/createstu/", createStudent);
router.put("/stu/:id", updateStudent);
router.delete("/stu/:id", deleteStudent);
router.post("/upload-csv", upload.single("file"), uploadStudentsCSV);

export default router;
