import express from "express";
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../Controller/Course.js";

const router = express.Router();

router.get("/getall", getCourses);
router.get("/getid/:id", getCourseById);
router.post("/", createCourse);
router.put("/change/:id", updateCourse);
router.delete("/delet/:id", deleteCourse);

export default router;
