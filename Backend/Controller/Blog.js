import Blog from '../Models/Blog.js';
import cloudinary from 'cloudinary';

export const createBlog = async (req, res) => {
  try {
    const { title, content, author, imagePath, rating } = req.body;

    if (!imagePath) {
      return res.status(400).json({ message: 'Image is required', success: false });
    }

    const base64Image = imagePath.split(';base64,').pop();
    const uploadResponse = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`,
      {
        folder: 'blogImages',
        use_filename: true,
        unique_filename: true,
        quality: 'auto:best',
        format: 'auto',
        width: 800,
        height: 600,
        crop: 'fit',
      }
    );

    const newBlog = new Blog({
      title,
      content,
      author,
      imagepath: uploadResponse.secure_url,
      rating: rating || 0,  // Default to 0 if rating is not provided
    });

    const savedBlog = await newBlog.save();

    res.status(201).json({ message: 'Blog created successfully', success: true, data: savedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, imagePath, rating } = req.body;

    let newImageUrl = imagePath;
    if (imagePath && imagePath.startsWith("data:image")) {
      const base64Image = imagePath.split(";base64,").pop();
      const uploadResponse = await cloudinary.uploader.upload(
        `data:image/png;base64,${base64Image}`,
        {
          folder: "blogImages",
          use_filename: true,
          unique_filename: true,
          quality: "auto:best",
          format: "auto",
          width: 800,
          height: 600,
          crop: "fit",
        }
      );
      newImageUrl = uploadResponse.secure_url;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, author, imagepath: newImageUrl, rating },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found", success: false });
    }

    res.status(200).json({ message: "Blog updated successfully", success: true, data: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found', success: false });
    }
    res.status(200).json({ message: 'Blog deleted successfully', success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog  not found", success: false });
        }
        res.status(200).json({ message: "Blog fetched successfully", success: true, data: blog });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};