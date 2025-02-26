import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  code: { type: String, required: true, unique: true }, 
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  exams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }] 
});

const Course = mongoose.model("Course", CourseSchema);
export default Course;
