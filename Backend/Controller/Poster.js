import Poster from '../Models/Poster.js';
import cloudinary from 'cloudinary';

// Add a new poster
export const addPoster = async (req, res) => {
    try {
        const { name, imagePath, seqno } = req.body;

        if (!imagePath) {
            return res.status(400).json({ message: "Image is required", success: false });
        }

        const base64Image = imagePath.split(";base64,").pop();
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

        const newPoster = new Poster({
            name,
            imagePath: uploadResponse.secure_url,
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

// Edit a poster
export const editPoster = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, imagePath, seqno } = req.body;

        let newImageUrl = imagePath;

        if (imagePath && imagePath.startsWith("data:image")) {
            const base64Image = imagePath.split(";base64,").pop();
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
            newImageUrl = uploadResponse.secure_url;
        }

        const updatedPoster = await Poster.findByIdAndUpdate(
            id,
            { name, imagePath: newImageUrl, seqno },
            { new: true }
        );

        if (!updatedPoster) {
            return res.status(404).json({ message: "Poster not found", success: false });
        }

        res.status(200).json({ message: "Poster updated successfully", success: true, data: updatedPoster });
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
