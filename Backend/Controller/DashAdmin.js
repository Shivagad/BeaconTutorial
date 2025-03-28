import Admin from "../Models/Admin.js"; // Adjust path as needed
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

// Create Admin
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log(req.body);

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

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



// Login
export const loginAdmin = async (req, res) => {
  try {
      // console.log(req.body)
      const { email, password } = req.body;
      if (!email || !password) {
          return res.status(400).json({
              success: false,
              message: "Please fill all the details carefully",
          })
      }

      // check for register user 
      let user = await Admin.findOne({ email });
      if (!user) {
          return res.status(401).json({
              success: false,
              message: "User does not exist",
          });
      }


      const payload = {
          email: user.email,
          id: user._id,
          role: user.role,
      };


      if (await bcrypt.compare(password, user.password)) {
          // password match
          let token = jwt.sign(payload, process.env.JWT_SECRET, {
              expiresIn: "2h",
          });

          user = user.toObject();
          user.token = token;
          user.password = undefined;

          const options = {
              expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
              httpOnly: true,
          }

          res.cookie("token", token, options).status(200).json({
              success: true,
              token,
              user,
              message: "User logged in successfully"
          });
      }
      else {
          return res.status(403).json({
              success: false,
              message: "Incorrect password or email",
          })
      }
  }
  catch (err) {
      console.error(err)
      return res.status(500).json({
          success: false,
          message: "Login false"
      })
  }
}