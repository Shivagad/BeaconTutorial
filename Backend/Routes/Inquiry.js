import express from "express";
import { submitInquiry,getAllInquiry,downloadInquiryCSV,deleteInquiry,deleteAllInquiry} from "../Controller/Inquiry.js";

const router = express.Router();

router.post("/inquiry", submitInquiry);
router.get("/getinquiries", getAllInquiry);
router.get("/inquiry/export", downloadInquiryCSV);
router.delete("/inquiry/deleteAll", deleteAllInquiry);
router.delete("/inquiry/:id", deleteInquiry);

export default router;


