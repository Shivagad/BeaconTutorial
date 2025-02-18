import express from "express";

import { createAdmin, getAdmins, getAdminById,loginAdmin, updateAdmin, deleteAdmin } from "../Controller/DashAdmin.js";

const router = express.Router();

router.post("/", createAdmin);
router.get("/", getAdmins);
router.get("/:id", getAdminById);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);
router.post('/login-admin',loginAdmin);
export default router;
