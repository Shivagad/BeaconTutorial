import Admin from "../Models/Admin.js"; // Adjust path as needed
import bcrypt from "bcrypt";

// Create Admin
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log(req.body);

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });
    // console.log("cv");
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();
    
    res.status(201).json({ message: "Admin created successfully" });
    // console.log("cv");
  } catch (error) {
    // console.log("cvdfc");
    res.status(500).json({ message: "Error creating admin", error: error.message });
    
  }
};

// Get All Admins
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins", error: error.message });
  }
};

// Get Single Admin by ID
export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin", error: error.message });
  }
};

// Update Admin
export const updateAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash new password if provided
    let updateData = { name, email };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedAdmin) return res.status(404).json({ message: "Admin not found" });

    res.status(200).json({ message: "Admin updated successfully", updatedAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error updating admin", error: error.message });
  }
};

// Delete Admin
export const deleteAdmin = async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);

    if (!deletedAdmin) return res.status(404).json({ message: "Admin not found" });

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting admin", error: error.message });
  }
};
