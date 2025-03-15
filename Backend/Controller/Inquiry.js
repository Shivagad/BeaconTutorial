import Inquiry from "../Models/Inquiry.js";
import { Parser } from "json2csv";
import { sendInquiryForm } from "./EmailService.js";

export const submitInquiry = async (req, res) => {
  try {
    const inquiryData = req.body;

    // Save the inquiry in the database
    const newInquiry = new Inquiry(inquiryData);
    await newInquiry.save();

    // Prepare email data for the inquiry form submission
    const userInquiryEmailData = {
      subject: "Inquiry Submission Details",
      ...inquiryData,
    };
    await sendInquiryForm(userInquiryEmailData);

    // Prepare email data for notifying the admin
    const adminInquiryEmailData = {
      subject: "New Inquiry Submission Details",
      email: "omkumavat2004@gmail.com", // Admin email
      ...inquiryData,
    };
    await sendInquiryForm(adminInquiryEmailData);

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





export const downloadInquiryCSV = async (req, res) => {
  try {
    // Query all scholarship entries from the database and return plain JavaScript objects.
    const inquiry = await Inquiry.find({}).lean();
    // Define the CSV fields/columns.
    const fields = [
      "firstName",
      "lastName",
      "branch",
      "phone",
      "email",
      "gender",
      "address",
      "city",
      "state",
      "previousStandard",
      "previousStandardMarks",
      "inquiryFor",
      "message",
      "createdAt",
    ];

    // Convert JSON data to CSV.
    const json2csvParser = new Parser({ fields });
    const csvData = json2csvParser.parse(inquiry);

    // Set the appropriate headers to prompt a file download.
    res.header("Content-Type", "text/csv");
    res.attachment("inquiry_entries.csv");
    res.status(200).send(csvData);
  } catch (error) {
    console.error("Error exporting inquiry CSV:", error);
    res.status(500).json({ error: "Failed to export inquiry CSV" });
  }
};



export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findByIdAndDelete(id);
    if (!inquiry) {
      return res.status(404).json({ error: "Inquiry entry not found" });
    }
    res.status(200).json({ message: "Inquiry entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting Inquiry entry:", error);
    res.status(500).json({ error: "Failed to delete Inquiry entry" });
  }
};


export const deleteAllInquiry = async (req, res) => {
  try {
    await Inquiry.deleteMany({});
    res.status(200).json({ message: "All Inquiry entries deleted successfully" });
  } catch (error) {
    console.error("Error deleting all Inquiry entries:", error);
    res.status(500).json({ error: "Failed to delete all Inquiry entries" });
  }
};

