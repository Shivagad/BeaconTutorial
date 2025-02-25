import express from "express";
import { createScholarship,getAllScholarships,downloadScholarshipCSV,deleteScholarship,deleteAllScholarships } from "../Controller/Scholarship.js";

const router = express.Router();

router.post("/create", createScholarship);
router.get("/getall", getAllScholarships);
router.get("/export", downloadScholarshipCSV);
router.delete("/deleteAll", deleteAllScholarships);
router.delete("/:id", deleteScholarship);

export default router;
