import express from "express";
import { addStat, getStat, updateStat } from "../Controller/Stat.js";

const router = express.Router();

router.post("/addstat", addStat);      
router.get("/getstat", getStat);            
router.put("/updatestat", updateStat);   

export default router;
