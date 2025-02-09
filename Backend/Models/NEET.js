import mongoose from 'mongoose';

const neetResultSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    imagePath: { type: String, required: true },
    college: { type: String   },
    totalMarks: { type: Number,  min: 0, max: 720 },
    AIR: { type: Number},
    physicsMarks: { type: Number,  min: 0, max: 180 },
    chemistryMarks: { type: Number,  min: 0, max: 180 },
    biologyMarks: { type: Number,  min: 0, max: 360 },
    seqno: { type: Number,required:true },
    Tag: { type: String}
}, { timestamps: true });

const NeetResult = mongoose.model('NeetResult', neetResultSchema);
export default NeetResult;