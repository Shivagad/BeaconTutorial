import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      author: { type: String, required: true },
      imagepath: { type: String,required: true },
      rating: { type: Number, default: 0 }
    },
    { timestamps: true }
  );
  

const Blog = mongoose.model('blog', BlogSchema);
export default Blog;