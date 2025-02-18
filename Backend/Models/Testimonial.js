import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tag: {
      type: String,
      required: true,
      trim: true,
    },
    seqno: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    youtubeVideoLink: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
