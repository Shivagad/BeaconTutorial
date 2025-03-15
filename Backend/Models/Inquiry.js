import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  firstName: String,
  branch:String,
  lastName: String,
  phone: String,
  email: String,
  gender: String,
  address: String,
  city: String,
  state: String,
  previousStandard: String,
  previousStandardMarks: Number,
  inquiryFor: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;


