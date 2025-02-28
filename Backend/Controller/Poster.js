import Poster from '../Models/Poster.js';
import cloudinary from 'cloudinary';

// Add a new poster
export const addPoster = async (req, res) => {
    try {
        const { name, imagePath, mobileImagePath, seqno } = req.body;

        if (!imagePath || !mobileImagePath) {
            return res.status(400).json({ message: "Both images are required", success: false });
        }

        const uploadImage = async (base64Data) => {
            const base64Image = base64Data.split(";base64,").pop();
            const uploadResponse = await cloudinary.uploader.upload(
                `data:image/png;base64,${base64Image}`,
                {
                    folder: "Posters",
                    use_filename: true,
                    unique_filename: true,
                    quality: "auto:best",
                    format: "auto",
                    width: 500,
                    height: 700,
                    crop: "fit",
                }
            );
            return uploadResponse.secure_url;
        };

        const uploadedImagePath = await uploadImage(imagePath);
        const uploadedMobileImagePath = await uploadImage(mobileImagePath);

        const newPoster = new Poster({
            name,
            imagePath: uploadedImagePath,
            mobileImagePath: uploadedMobileImagePath,
            seqno,
        });

        const savedPoster = await newPoster.save();
        res.status(201).json({ message: "Poster added successfully", success: true, data: savedPoster });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

// Get all posters sorted by seqno
export const getAllPosters = async (req, res) => {
    try {
        const posters = await Poster.find().sort({ seqno: 1 });

        if (!posters || posters.length === 0) {
            return res.status(404).json({ message: "No posters found", success: false });
        }

        res.status(200).json({ message: "Posters fetched successfully", success: true, data: posters });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

// Delete a poster
export const deletePoster = async (req, res) => {
    try {
        const { id } = req.params;
        const poster = await Poster.findByIdAndDelete(id);

        if (!poster) {
            return res.status(404).json({ message: "Poster not found", success: false });
        }

        res.status(200).json({ message: "Poster deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

// Get a poster by ID
export const getPosterById = async (req, res) => {
    try {
        const { id } = req.params;
        const poster = await Poster.findById(id);

        if (!poster) {
            return res.status(404).json({ message: "Poster not found", success: false });
        }

        res.status(200).json({ message: "Poster fetched successfully", success: true, data: poster });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};


// Edit a poster
export const editPoster = async (req, res) => {
    try {
        const { id } = req.params;
        let { name, imagePath, mobileImagePath, seqno } = req.body;

        // Function to upload image to Cloudinary
        const uploadImage = async (base64Data) => {
            try {
                const matches = base64Data.match(/^data:image\/(png|jpeg|jpg);base64,/);
                if (!matches) throw new Error("Invalid base64 format");

                const format = matches[1]; // Extract format (png, jpeg, jpg)
                const base64Image = base64Data.split(";base64,").pop();

                const uploadResponse = await cloudinary.uploader.upload(
                    `data:image/${format};base64,${base64Image}`,
                    {
                        folder: "Posters",
                        use_filename: true,
                        unique_filename: true,
                        quality: "auto:best",
                        format: "auto",
                        width: 500,
                        height: 700,
                        crop: "fit",
                    }
                );
                return uploadResponse.secure_url;
            } catch (error) {
                console.error("Cloudinary upload failed:", error);
                return null; // Return null if upload fails
            }
        };

        // Fetch existing poster to retain old images if not provided
        const existingPoster = await Poster.findById(id);
        if (!existingPoster) {
            return res.status(404).json({ message: "Poster not found", success: false });
        }

        let newImagePath = existingPoster.imagePath;
        let newMobileImagePath = existingPoster.mobileImagePath;

        // Upload new images only if they are provided in base64 format
        if (imagePath && imagePath.startsWith("data:image")) {
            newImagePath = await uploadImage(imagePath);
            if (!newImagePath) {
                return res.status(500).json({ message: "Image upload failed", success: false });
            }
        }

        if (mobileImagePath && mobileImagePath.startsWith("data:image")) {
            newMobileImagePath = await uploadImage(mobileImagePath);
            if (!newMobileImagePath) {
                return res.status(500).json({ message: "Mobile image upload failed", success: false });
            }
        }

        // Construct update object
        const updateFields = {};
        if (name) updateFields.name = name;
        if (seqno) updateFields.seqno = seqno;
        updateFields.imagePath = newImagePath;
        updateFields.mobileImagePath = newMobileImagePath;

        const updatedPoster = await Poster.findByIdAndUpdate(id, updateFields, { new: true });

        res.status(200).json({ message: "Poster updated successfully", success: true, data: updatedPoster });

    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};


