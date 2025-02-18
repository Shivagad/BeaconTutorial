import express from "express";
const router = express.Router();

import {sendOTPEmail} from '../Controller/EmailService.js';
router.post('/otp-email',sendOTPEmail);

import { Signup,Login } from "../Controller/Student.js";
router.post('/signup-student',Signup);
router.post('/login-student',Login);

export default router;
