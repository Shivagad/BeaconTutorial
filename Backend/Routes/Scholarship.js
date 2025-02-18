import express from "express";
import { createScholarship,getAllScholarships } from "../Controller/Scholarship.js";

const router = express.Router();

router.post("/create", createScholarship);
router.get("/getall", getAllScholarships);

export default router;
