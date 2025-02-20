import Inquiry from "../Models/Inquiry.js";


export const submitInquiry = async (req, res) => {
  const inquiryData = req.body;

  try {
   
    const newInquiry = new Inquiry(inquiryData);
    await newInquiry.save(); 
    console.log(inquiryData);
    res.status(200).json({ message: "Inquiry form submitted successfully!" });
  } catch (error) {
    console.error("Error saving inquiry:", error);
    res.status(500).json({ message: "Error submitting inquiry form." });
  }
};


export const getAllInquiry = async (req, res) => {
    try {
      const inquiries = await Inquiry.find(); 
      res.status(200).json({
        status: "success",
        message: "Inquiries retrieved successfully!",
        data: inquiries,
      });
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      res.status(500).json({
        status: "error",
        message: "Error fetching inquiries.",
      });
    }
  };