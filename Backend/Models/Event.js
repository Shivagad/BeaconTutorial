const mongoose = require('mongoose');

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
const EventGallery = mongoose.model('EventGallery', eventGallerySchema);
module.exports = EventGallery;
