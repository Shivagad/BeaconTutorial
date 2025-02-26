import mongoose from "mongoose";
import Course from "./Course.js";

const ExamSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  date: { type: Date, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true } 
});

const Exam = mongoose.model("Exam", ExamSchema);
export default Exam;
