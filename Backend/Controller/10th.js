import tenthResult from '../Models/10th.js';
import cloudinary from 'cloudinary'; 

export const addStudentResult = async (req, res) => {
    try {
        const { firstName, lastName, percentage, boardName, scienceMarks, mathMarks, Tag ,seqno} = req.body;
        const image = req.files ? req.files.image : null;
        if (!image) {
            return res.status(400).json({ message: "Image is required", success: false });
        }
        const uploadResult = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: 'student_results', 
        });

        const newResult = new tenthResult({
            firstName,
            lastName,
            imagePath: uploadResult.secure_url, 
            percentage,
            boardName,
            scienceMarks,
            mathMarks,
            Tag,
            seqno,
        });
        const savedResult = await newResult.save();
        res.status(201).json({ message: "Student result added successfully", success: true, result: savedResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, success: false });
    }
};


export const getAllStudentResults = async (req, res) => {
    try {
        const results = await tenthResult.find();

        if (!results || results.length === 0) {
            return res.status(404).json({ message: "No student results found", success: false });
        }
        res.status(200).json({ message: "Student results fetched successfully", success: true, results });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};


export const editStudentResult = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, imagePath, percentage, boardName, scienceMarks, mathMarks, Tag,seqno } = req.body;

        const result = await tenthResult.findByIdAndUpdate(id, {
            firstName,
            lastName,
            imagePath,
            percentage,
            boardName,
            scienceMarks,
            mathMarks,
            Tag,seqno
        }, { new: true });

        if (!result) {
            return res.status(404).json({ message: "Student result not found", success: false });
        }

        res.status(200).json({ message: "Student result updated successfully", success: true, result });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};


export const deleteStudentResult = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await tenthResult.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Student result not found", success: false });
        }
        res.status(200).json({ message: "Student result deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};
