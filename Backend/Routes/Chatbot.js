import express from "express";
import { handleChat } from '../Controller/Chatbot.js';

const router = express.Router();
router.post("/chat", handleChat);

export default router;
