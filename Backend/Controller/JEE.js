import JEEResult from '../Models/JEE.js';
import cloudinary from 'cloudinary';

export const addJEEStudentResult = async (req, res) => {
    try {
        const { firstName, lastName, college, totalPercentile, imagePath, AIR, physicsPercentile, chemistryPercentile, mathematicsPercentile, seqno, Tag } = req.body;

        if (!imagePath) {
            return res.status(400).json({ message: "Image is required", success: false });
        }

        const base64Image = imagePath.split(";base64,").pop();
        const uploadResponse = await cloudinary.uploader.upload(
            `data:image/png;base64,${base64Image}`,
            {
                folder: "JEEResults",
                use_filename: true,
                unique_filename: true,
                quality: "auto:best",
                format: "auto",
                width: 374,
                height: 305,
                crop: "fit",
            }
        );

        const newResult = new JEEResult({
            firstName,
            lastName,
            imagePath: uploadResponse.secure_url,
            college,
            totalPercentile,
            AIR,
            physicsPercentile,
            chemistryPercentile,
            mathematicsPercentile,
            seqno,
            Tag,
        });

        const savedResult = await newResult.save();

        res.status(201).json({ message: "JEE student result added successfully", success: true, data: savedResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, success: false });
    }
};

export const getAllJEEStudentResults = async (req, res) => {
    try {
        const results = await JEEResult.find();

        if (!results || results.length === 0) {
            return res.status(404).json({ message: "No JEE student results found", success: false });
        }

        res.status(200).json({ message: "JEE student results fetched successfully", success: true, data: results });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const editJEEStudentResult = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, image, college, totalPercentile, AIR, physicsPercentile, chemistryPercentile, mathematicsPercentile, seqno, Tag } = req.body;

        let newImageUrl = image;

        if (image && image.startsWith("data:image")) {
            const base64Image = image.split(";base64,").pop();
            const uploadResponse = await cloudinary.uploader.upload(
                `data:image/png;base64,${base64Image}`,
                {
                    folder: "JEEResults",
                    use_filename: true,
                    unique_filename: true,
                    quality: "auto:best",
                    format: "auto",
                    width: 374,
                    height: 305,
                    crop: "fit",
                }
            );
            newImageUrl = uploadResponse.secure_url;
        }

        const result = await JEEResult.findByIdAndUpdate(
            id,
            {
                firstName,
                lastName,
                imagePath: newImageUrl,
                college,
                totalPercentile,
                AIR,
                physicsPercentile,
                chemistryPercentile,
                mathematicsPercentile,
                seqno,
                Tag,
            },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "JEE student result not found", success: false });
        }

        res.status(200).json({ message: "JEE student result updated successfully", success: true, data: result });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const deleteJEEStudentResult = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await JEEResult.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "JEE student result not found", success: false });
        }

        res.status(200).json({ message: "JEE student result deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const getJEEStudentResultById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await JEEResult.findById(id);

        if (!result) {
            return res.status(404).json({ message: "JEE student result not found", success: false });
        }

        res.status(200).json({ message: "JEE student result fetched successfully", success: true, data: result });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};
