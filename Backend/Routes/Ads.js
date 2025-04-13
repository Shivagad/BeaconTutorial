import express from "express";
import { addAd, getAllAds, getAdById, deleteAd } from "../Controller/Ads.js";

const router = express.Router();

// Ads routes
router.post('/add', addAd);  // No multer needed anymore
router.get("/", getAllAds);
router.get("/:id", getAdById);
router.delete("/:id", deleteAd);

export default router;
