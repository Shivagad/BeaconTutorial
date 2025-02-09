import mongoose from 'mongoose';

const studentResultSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    imagePath: { type: String, required: true },
    percentage: { type: Number },
    boardName: { type: String },
    scienceMarks: { type: Number, min: 0, max: 100 },
    mathMarks: { type: Number,  min: 0, max: 100 },
    Tag:{type:String}
}, { timestamps: true });

const tenthResult = mongoose.model('tenthResult', studentResultSchema);
export default tenthResult;