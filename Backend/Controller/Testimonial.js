import Testimonial from "../Models/Testimonial.js"; // Adjust path as needed


// Create Testimonial
export const createTestimonial = async (req, res) => {
  try {
    const { name, tag, seqno, description, youtubeVideoLink } = req.body;

    // (Optional) You might check for an existing testimonial if needed:
    const existingTestimonial = await Testimonial.findOne({ name });
    if (existingTestimonial) return res.status(400).json({ message: "Testimonial already exists" });
    const newTestimonial = new Testimonial({ name, tag, seqno, description, youtubeVideoLink });
    await newTestimonial.save();

    res.status(201).json({ message: "Testimonial created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating testimonial", error: error.message });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json({ data: testimonials });
  } catch (error) {
    res.status(500).json({ message: "Error fetching testimonials", error: error.message });
  }
};

export const getSortedTestimonials = async (req, res) => {
    try {
      const testimonials = await Testimonial.find().sort({ seqNo: 1 }); // Sort by seqNo in ascending order
      res.status(200).json({ data: testimonials });
    } catch (error) {
      res.status(500).json({ message: "Error fetching sorted testimonials", error: error.message });
    }
  };
  

// Get Single Testimonial by ID
export const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial)
      return res.status(404).json({ message: "Testimonial not found" });

    res.status(200).json({ data: testimonial });
  } catch (error) {
    res.status(500).json({ message: "Error fetching testimonial", error: error.message });
  }
};

// Update Testimonial
export const updateTestimonial = async (req, res) => {
  try {
    const { name, tag, seqno, description, youtubeVideoLink } = req.body;

    const updateData = { name, tag, seqno, description, youtubeVideoLink };

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedTestimonial)
      return res.status(404).json({ message: "Testimonial not found" });

    res
      .status(200)
      .json({ message: "Testimonial updated successfully", updatedTestimonial });
  } catch (error) {
    res.status(500).json({ message: "Error updating testimonial", error: error.message });
  }
};

// Delete Testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!deletedTestimonial)
      return res.status(404).json({ message: "Testimonial not found" });

    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting testimonial", error: error.message });
  }
};

export const getThreeTestimonial = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ seqno: 1 }).limit(3);
    res.status(200).json({ data: testimonials });
  } catch (error) {
    res.status(500).json({ message: "Error fetching sorted testimonials", error: error.message });
  }
};


