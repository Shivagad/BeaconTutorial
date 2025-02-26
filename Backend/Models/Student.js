import mongoose from "mongoose";
import Course from './Course.js'
import Result from './ResultSchema.js'
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  profilePicture: {
    type: String,
    default: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
  },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course"},
  results: [{ type: mongoose.Schema.Types.ObjectId, ref: "Result" }] 
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
