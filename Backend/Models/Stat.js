import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
  studentsCount: { type: Number, required: true },
  expertFacultyCount: { type: Number, required: true },
  successRate: { type: Number, required: true },
  yearsOfExperience: { type: Number, required: true },
});

const Stat = mongoose.model("Stat", statSchema);

export default Stat;
