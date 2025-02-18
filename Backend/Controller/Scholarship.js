import Scholarship from "../Models/Scholarship.js";

export const createScholarship = async (req, res) => {
  try {
    const existingScholarship = await Scholarship.findOne({ email: req.body.email });
    if (existingScholarship) {
      return res.status(409).json({
        success: false,
        error: "Scholarship already exists for this email",
      });
    }
    const scholarship = await Scholarship.create(req.body);
    res.status(201).json({ success: true, data: scholarship });
  } catch (error) {
    console.error("Error creating scholarship:", error);
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: "Scholarship already exists",
      });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};


export const getAllScholarships = async (req, res) => {
    try {
      const scholarships = await Scholarship.find();
      res.status(200).json({ success: true, data: scholarships });
    } catch (error) {
      console.error("Error fetching scholarships:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  };