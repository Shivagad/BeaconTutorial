import mongoose from "mongoose";
const eventGallerySchema = new mongoose.Schema({
  eventName: {
    type: String,
    trim: true,
  },
  year: {
    type: Number,
  },
  imagesPath: [
    {
      type: String,
    }
  ],
  description: {
    type: String,
    trim: true,
  },
});
export default mongoose.model('EventGallery', eventGallerySchema);

