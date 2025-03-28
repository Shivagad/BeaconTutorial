import mongoose from 'mongoose';

const OtherExamResults = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    imagePath: { type: String, required: true },
    ExamName:{type:String,required:true},
    seqno: { type: Number,required:true },
    Tag: { type: String }
}, { timestamps: true });

const OtherExamResult= mongoose.model('OtherExamResults', OtherExamResults);
export default OtherExamResult;

