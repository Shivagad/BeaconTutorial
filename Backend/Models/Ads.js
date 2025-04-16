import mongoose from 'mongoose';

const AdsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model('Ads', AdsSchema);
