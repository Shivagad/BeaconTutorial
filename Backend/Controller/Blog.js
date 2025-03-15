import Blog from '../Models/Blog.js';
import cloudinary from 'cloudinary';

export const createBlog = async (req, res) => {
  try {
    const { title, content, author, imagePath, rating } = req.body;

    if (!imagePath) {
      return res.status(400).json({ message: 'Image is required', success: false });
    }

    const imageUrls = [];
    for (const image of imagePath) {
      const base64Image = image.split(";base64,").pop();
      const uploadResponse = await cloudinary.uploader.upload(
        `data:image/png;base64,${base64Image}`,
        {
          folder: "EventGallery",
          use_filename: true,
          unique_filename: true,
          quality: "auto:best",
          format: "auto",
          width: 500,
          height: 700,
          crop: "fit",
        }
      );
      imageUrls.push(uploadResponse.secure_url);
    }


    const newBlog = new Blog({
      title,
      content,
      author,
      imagePath: imageUrls,
      rating: rating || 0,  // Default to 0 if rating is not provided
    });

    const savedBlog = await newBlog.save();

    res.status(201).json({ message: 'Blog created successfully', success: true, data: savedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};


export const updateBlogRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    if (!rating) return res.status(400).json({ message: 'Rating is required' });

    const updatedBlog = await Blog.findByIdAndUpdate(id, { rating }, { new: true });

    if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json({ message: 'Rating updated', data: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    if (!imagePath) {
      return res.status(400).json({ message: 'Image is required', success: false });
    }

    const updatedImageUrls = []
    if (imagePath && imagePath.length > 0) {
      for (const image of imagePath) {
        // Check if image is a new Base64 string.
        if (typeof image === "string" && image.startsWith("data:image")) {
          const base64Image = image.split(";base64,").pop();
          const uploadResponse = await cloudinary.uploader.upload(
            `data:image/png;base64,${base64Image}`,
            {
              folder: "EventGallery",
              use_filename: true,
              unique_filename: true,
              quality: "auto:best",
              format: "auto",
              width: 500,
              height: 700,
              crop: "fit",
            }
          );
          updatedImageUrls.push(uploadResponse.secure_url);
        }
        // If image is an object with a base64 property.
        else if (typeof image === "object" && image.base64) {
          const base64Image = image.base64.split(";base64,").pop();
          const uploadResponse = await cloudinary.uploader.upload(
            `data:image/png;base64,${base64Image}`,
            {
              folder: "EventGallery",
              use_filename: true,
              unique_filename: true,
              quality: "auto:best",
              format: "auto",
              width: 500,
              height: 700,
              crop: "fit",
            }
          );
          updatedImageUrls.push(uploadResponse.secure_url);
        }
        // Otherwise, assume it's an existing URL.
        else {
          updatedImageUrls.push(image);
        }
      }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, author, imagePath: updatedImageUrls, rating },
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