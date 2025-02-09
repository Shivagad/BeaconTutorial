import mongoose from 'mongoose';

const cetResultSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    imagePath: { type: String, required: true },
    college: { type: String },
    totalPercentile: { type: Number, min: 0, max: 100 },
    AIR: { type: Number },
    mathematicsPercentile: { type: Number, min: 0, max: 100 },
    physicsPercentile: { type: Number, min: 0, max: 100 },
    chemistryPercentile: { type: Number, min: 0, max: 100 },
    biologyPercentile: { type: Number, min: 0, max: 100 },
    seqno: { type: Number,required:true },
    Tag: { type: String }
}, { timestamps: true });

const CETResult = mongoose.model('CETResult', cetResultSchema);
export default CETResult;
