import mongoose from 'mongoose';


const twelfthResultSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    imagePath: { type: String, required: true },
    percentage: { type: Number },
    boardName: { type: String },
    seqno: { type: Number,required:true },
    physicsMarks: { type: Number, min: 0, max: 100 },
    chemistryMarks: { type: Number, min: 0, max: 100 },
    mathMarks: { type: Number, min: 0, max: 100 },
    biologyMarks: { type: Number, min: 0, max: 100 },
    Tag: { type: String }
}, { timestamps: true });

const twelfthResult = mongoose.model('twelfthResult', twelfthResultSchema);
export default twelfthResult;