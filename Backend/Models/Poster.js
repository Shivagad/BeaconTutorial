import mongoose from 'mongoose';

const posterSchema = new mongoose.Schema({
    name: { type: String, required: true },  
    imagePath: { type: String, required: true },  
    seqno: { type: Number, required: true,},  
}, { timestamps: true });

const Poster = mongoose.model('Poster', posterSchema);
export default Poster;