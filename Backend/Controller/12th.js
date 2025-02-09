import twelfthResult from '../Models/12th.js'; 
import cloudinary from 'cloudinary'; 


export const addTwelfthStudentResult = async (req, res) => {
    try {
        const { firstName, lastName, percentage, boardName, seqno, physicsMarks, chemistryMarks, mathMarks, biologyMarks, Tag } = req.body;
        const image = req.files ? req.files.image : null;
        
        if (!image) {
            return res.status(400).json({ message: "Image is required", success: false });
        }

        const uploadResult = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: 'twelfth_student_results',
        });
        const newResult = new twelfthResult({
            firstName,
            lastName,
            imagePath: uploadResult.secure_url,
            percentage,
            boardName,
            seqno, 
            physicsMarks,
            chemistryMarks,
            mathMarks,
            biologyMarks,
            Tag,
        });

        
        const savedResult = await newResult.save();

        res.status(201).json({ message: "Twelfth student result added successfully", success: true, result: savedResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, success: false });
    }
};


export const getAllTwelfthStudentResults = async (req, res) => {
    try {
        const results = await twelfthResult.find();

        if (!results || results.length === 0) {
            return res.status(404).json({ message: "No student results found", success: false });
        }

        res.status(200).json({ message: "Twelfth student results fetched successfully", success: true, results });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};


export const editTwelfthStudentResult = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, imagePath, percentage, boardName, seqno, physicsMarks, chemistryMarks, mathMarks, biologyMarks, Tag } = req.body;

        const result = await twelfthResult.findByIdAndUpdate(id, {
            firstName,
            lastName,
            imagePath,
            percentage,
            boardName,
            seqno,
            physicsMarks,
            chemistryMarks,
            mathMarks,
            biologyMarks,
            Tag
        }, { new: true });

        if (!result) {
            return res.status(404).json({ message: "Twelfth student result not found", success: false });
        }

        res.status(200).json({ message: "Twelfth student result updated successfully", success: true, result });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};


export const deleteTwelfthStudentResult = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await twelfthResult.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Twelfth student result not found", success: false });
        }

        res.status(200).json({ message: "Twelfth student result deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};
