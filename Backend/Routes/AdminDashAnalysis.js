// routes/adminRoutes.js
import express from "express";
import { getAllStudentsAverageAnalysis } from "../Controller/AdminDashAnalysis.js";

const router = express.Router();

router.get("/analysis", getAllStudentsAverageAnalysis);

export default router;
