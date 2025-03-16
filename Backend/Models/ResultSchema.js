import mongoose from "mongoose";
import Student from './Student.js';

const ResultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  exam: { type: String, required: true },
  examDate: { type: Date, required: true },
  totalMarks: { type: Number, required: true },
  outof: { type: Number, required: true },
  rank: { type: String, required: true },
  correctAnswers: { type: Number, required: true },
  incorrectAnswers: { type: Number, required: true },
  notAttempted: { type: Number, required: true },
  physics: { type: Number},
  physicsSectionA: { type: Number },
  physicsSectionB: { type: Number },
  chemistry: { type: Number },
  chemistrySectionA: { type: Number },
  chemistrySectionB: { type: Number },
  maths: { type: Number },
  mathsSectionA: { type: Number},
  mathsSectionB: { type: Number },
  biology: { type: Number },
  biologySectionA: { type: Number},
  biologySectionB: { type: Number },
  timestamp: { type: Date, default: Date.now }
});

const Result = mongoose.model("Result", ResultSchema);
export default Result;
