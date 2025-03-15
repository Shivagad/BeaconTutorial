import mongoose from "mongoose";
import Student from './Student.js';

const ResultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  exam: { type: String, required: true },
  examDate: { type: Date, required: true },
  totalMarks: { type: Number, required: true },
  rank: { type: String, required: true },
  correctAnswers: { type: Number, required: true },
  incorrectAnswers: { type: Number, required: true },
  notAttempted: { type: Number, required: true },
  physics: { type: Number, required: true },
  physicsSectionA: { type: Number, required: true },
  physicsSectionB: { type: Number, required: true },
  chemistry: { type: Number, required: true },
  chemistrySectionA: { type: Number, required: true },
  chemistrySectionB: { type: Number, required: true },
  maths: { type: Number, required: true },
  mathsSectionA: { type: Number, required: true },
  mathsSectionB: { type: Number, required: true },
  biology: { type: Number, required: true },
  biologySectionA: { type: Number, required: true },
  biologySectionB: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Result = mongoose.model("Result", ResultSchema);
export default Result;
