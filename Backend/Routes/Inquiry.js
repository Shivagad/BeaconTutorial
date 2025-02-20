import express from "express";
import { submitInquiry,getAllInquiry } from "../Controller/Inquiry.js";

const router = express.Router();

router.post("/inquiry", submitInquiry);
router.get("/getinquiries", getAllInquiry);

export default router;
