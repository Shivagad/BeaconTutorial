import NeetResult from '../Models/NEET.js';
import cloudinary from 'cloudinary';

export const addNeetStudentResult = async (req, res) => {
    try {
        const { firstName, imagePath, lastName, college, totalMarks, AIR, physicsMarks, chemistryMarks, biologyMarks, seqno, Tag } = req.body;

        if (!imagePath) {
            return res.status(400).json({ message: "Image is required", success: false });
        }

        const base64Image = imagePath.split(";base64,").pop();
        const uploadResponse = await cloudinary.uploader.upload(
            `data:image/png;base64,${base64Image}`,
            {
                folder: "NEETResults",
                use_filename: true,
                unique_filename: true,
                quality: "auto:best",
                format: "auto",
                width: 374,
                height: 305,
                crop: "fit",
            }
        );

        const newResult = new NeetResult({
            firstName,
            lastName,
            imagePath: uploadResponse.secure_url,
            college,
            totalMarks,
            AIR,
            physicsMarks,
            chemistryMarks,
            biologyMarks,
            seqno,
            Tag,
        });

        const savedResult = await newResult.save();

        res.status(201).json({ message: "NEET student result added successfully", success: true, data: savedResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, success: false });
    }
};

export const getAllNeetStudentResults = async (req, res) => {
    try {
        const results = await NeetResult.find();

        if (!results || results.length === 0) {
            return res.status(404).json({ message: "No NEET student results found", success: false });
        }

        res.status(200).json({ message: "NEET student results fetched successfully", success: true, data: results });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const editNeetStudentResult = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, imagePath, college, totalMarks, AIR, physicsMarks, chemistryMarks, biologyMarks, seqno, Tag } = req.body;

        let newImageUrl = imagePath;

        if (imagePath && imagePath.startsWith("data:image")) {
            const base64Image = imagePath.split(";base64,").pop();
            const uploadResponse = await cloudinary.uploader.upload(
                `data:image/png;base64,${base64Image}`,
                {
                    folder: "NEETResults",
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

        const result = await NeetResult.findByIdAndUpdate(
            id,
            {
                firstName,
                lastName,
                imagePath: newImageUrl,
                college,
                totalMarks,
                AIR,
                physicsMarks,
                chemistryMarks,
                biologyMarks,
                seqno,
                Tag,
            },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "NEET student result not found", success: false });
        }

        res.status(200).json({ message: "NEET student result updated successfully", success: true, data: result });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const deleteNeetStudentResult = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await NeetResult.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "NEET student result not found", success: false });
        }

        res.status(200).json({ message: "NEET student result deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const getNeetStudentResultById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await NeetResult.findById(id);

        if (!result) {
            return res.status(404).json({ message: "NEET student result not found", success: false });
        }

        res.status(200).json({ message: "NEET student result fetched successfully", success: true, data: result });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};
