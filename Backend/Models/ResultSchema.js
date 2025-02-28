import mongoose from "mongoose";
import Student from './Student.js';
import Exam from './Exam.js';

const ResultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  marksObtained: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  percentage: { type: String, required: true },
  grade: { type: String, required: true },
  remarks: { type: String, required: true }
});


const Result = mongoose.model("Result", ResultSchema);
export default Result;
