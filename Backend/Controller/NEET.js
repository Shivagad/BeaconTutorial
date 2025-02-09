import NeetResult from '../Models/NEET.js';
import cloudinary from 'cloudinary';

export const addNeetStudentResult = async (req, res) => {
    try {
        const { firstName, lastName, college, totalMarks, AIR, physicsMarks, chemistryMarks, biologyMarks, seqno, Tag } = req.body;
        const image = req.files ? req.files.image : null;

        if (!image) {
            return res.status(400).json({ message: "Image is required", success: false });
        }

        const uploadResult = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: 'neet_student_results',
        });

        const newResult = new NeetResult({
            firstName,
            lastName,
            imagePath: uploadResult.secure_url,
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

        res.status(201).json({ message: "NEET student result added successfully", success: true, result: savedResult });
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

        res.status(200).json({ message: "NEET student results fetched successfully", success: true, results });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const editNeetStudentResult = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, imagePath, college, totalMarks, AIR, physicsMarks, chemistryMarks, biologyMarks, seqno, Tag } = req.body;

        const result = await NeetResult.findByIdAndUpdate(id, {
            firstName,
            lastName,
            imagePath,
            college,
            totalMarks,
            AIR,
            physicsMarks,
            chemistryMarks,
            biologyMarks,
            seqno,
            Tag
        }, { new: true });

        if (!result) {
            return res.status(404).json({ message: "NEET student result not found", success: false });
        }

        res.status(200).json({ message: "NEET student result updated successfully", success: true, result });
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
