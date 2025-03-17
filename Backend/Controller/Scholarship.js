import Scholarship from "../Models/Scholarship.js";
import { Parser } from "json2csv";


  export const createScholarship = async (req, res) => {
    try {
      // await Scholarship.collection.dropIndex("email_1");
      const scholarship = await Scholarship.create(req.body);
      res.status(201).json({ success: true, data: scholarship });
    } catch (error) {
      console.error("Error creating scholarship:", error);
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

  export const downloadScholarshipCSV = async (req, res) => {
    try {
      // Query all scholarship entries from the database and return plain JavaScript objects.
      const scholarships = await Scholarship.find({}).lean();
  
      // Define the CSV fields/columns.
      const fields = [
        "firstName",
        "lastName",
        "birthday",
        "gender",
        "email",
        "address",
        "phone",
        "educationMode",
        "marks",
        "board",
        "SchoolName"
      ];
  
      // Convert JSON data to CSV.
      const json2csvParser = new Parser({ fields });
      const csvData = json2csvParser.parse(scholarships);
  
      // Set the appropriate headers to prompt a file download.
      res.header("Content-Type", "text/csv");
      res.attachment("scholarship_entries.csv");
      res.status(200).send(csvData);
    } catch (error) {
      console.error("Error exporting scholarship CSV:", error);
      res.status(500).json({ error: "Failed to export scholarship CSV" });
    }
  };



  export const deleteScholarship = async (req, res) => {
    try {
      const { id } = req.params;
      const scholarship = await Scholarship.findByIdAndDelete(id);
      if (!scholarship) {
        return res.status(404).json({ error: "Scholarship entry not found" });
      }
      res.status(200).json({ message: "Scholarship entry deleted successfully" });
    } catch (error) {
      console.error("Error deleting scholarship entry:", error);
      res.status(500).json({ error: "Failed to delete scholarship entry" });
    }
  };


  export const deleteAllScholarships = async (req, res) => {
    try {
      await Scholarship.deleteMany({});
      res.status(200).json({ message: "All scholarship entries deleted successfully" });
    } catch (error) {
      console.error("Error deleting all scholarship entries:", error);
      res.status(500).json({ error: "Failed to delete all scholarship entries" });
    }
  };
  
