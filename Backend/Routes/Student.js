import express from "express";
const router = express.Router();

import {sendOTPEmail,sendScholarregSuccessfull} from '../Controller/EmailService.js';
router.post('/otp-email',sendOTPEmail);
router.post('/scholarregsuccess',sendScholarregSuccessfull);

import { Signup,Login } from "../Controller/Student.js";
router.post('/signup-student',Signup);
router.post('/login-student',Login);

export default router;
