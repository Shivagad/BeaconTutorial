import mongoose from "mongoose";

const ScholarshipSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: Date, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true},
    address: { type: String },
    phone: { type: String, required: true },
    educationMode: { type: String },
    marks: { type: Number, required: true },
    board: { type: String, required: true },
    SchoolName:{type:String,required:true},
  },
  { timestamps: true }
);

export default mongoose.model("Scholarship", ScholarshipSchema);
