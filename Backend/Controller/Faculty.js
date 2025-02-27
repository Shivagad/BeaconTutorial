import Faculty from '../Models/Faculty.js';
import cloudinary from 'cloudinary';

const DEFAULT_PROFILE_IMAGE = "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png";

// Create Faculty
export const addFaculty = async (req, res) => {
    try {
        const { name, email, phone, subjects, qualification, profileImage, bio, joiningDate } = req.body;

        let imageUrl = DEFAULT_PROFILE_IMAGE;
        if (profileImage && profileImage.startsWith("data:image")) {
            const base64Image = profileImage.split(";base64,").pop();
            const uploadResponse = await cloudinary.uploader.upload(
                `data:image/png;base64,${base64Image}`,
                {
                    folder: "Faculty",
                    use_filename: true,
                    unique_filename: true,
                    quality: "auto:best",
                    format: "auto",
                    crop: "fit",
                }
            );
            imageUrl = uploadResponse.secure_url;
        }

        const newFaculty = new Faculty({
            name,
            email,
            phone,
            subjects,
            qualification,
            profileImage: imageUrl,
            bio,
            joiningDate
        });

        const savedFaculty = await newFaculty.save();
        res.status(201).json({ message: "Faculty added successfully", success: true, data: savedFaculty });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

// Get All Faculty
export const getAllFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.find();
        if (!faculty.length) {
            return res.status(404).json({ message: "No faculty found", success: false });
        }
        res.status(200).json({ message: "Faculty fetched successfully", success: true, data: faculty });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

// Get Faculty by ID
export const getFacultyById = async (req, res) => {
    try {
        const { id } = req.params;
        const faculty = await Faculty.findById(id);
        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found", success: false });
        }
        res.status(200).json({ message: "Faculty fetched successfully", success: true, data: faculty });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

// Update Faculty
export const editFaculty = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, subjects, qualification, profileImage, bio, joiningDate } = req.body;

        let newImageUrl = profileImage;
        if (profileImage && profileImage.startsWith("data:image")) {
            const base64Image = profileImage.split(";base64,").pop();
            const uploadResponse = await cloudinary.uploader.upload(
                `data:image/png;base64,${base64Image}`,
                {
                    folder: "Faculty",
                    use_filename: true,
                    unique_filename: true,
                    quality: "auto:best",
                    format: "auto",
                    crop: "fit",
                }
            );
            newImageUrl = uploadResponse.secure_url;
        }

        const existingFaculty = await Faculty.findById(id);
        if (!existingFaculty) {
            return res.status(404).json({ message: "Faculty not found", success: false });
        }

        const updatedFaculty = await Faculty.findByIdAndUpdate(
            id,
            {
                name,
                email,
                phone,
                subjects,
                qualification,
                profileImage: newImageUrl || existingFaculty.profileImage || DEFAULT_PROFILE_IMAGE,
                bio,
                joiningDate
            },
            { new: true }
        );

        res.status(200).json({ message: "Faculty updated successfully", success: true, data: updatedFaculty });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};


export const deleteFaculty = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFaculty = await Faculty.findByIdAndDelete(id);

        if (!deletedFaculty) {
            return res.status(404).json({ message: "Faculty not found", success: false });
        }

        res.status(200).json({ message: "Faculty deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};
