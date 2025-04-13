
import mongoose from 'mongoose';

const AdSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },  
});

const Ads = mongoose.model("Ads", AdSchema);
export default Ads;
