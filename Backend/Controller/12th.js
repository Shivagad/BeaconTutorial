import twelfthResult from '../Models/12th.js';
import cloudinary from 'cloudinary';

export const addTwelfthStudentResult = async (req, res) => {
    try {
        const { firstName, lastName, imagePath, percentage, boardName, seqno, physicsMarks, chemistryMarks, mathMarks, biologyMarks, Tag } = req.body;

        if (!imagePath) {
            return res.status(400).json({ message: "Image is required", success: false });
        }

        const base64Image = imagePath.split(";base64,").pop();
        // console.log(base64Image);
        const uploadResponse = await cloudinary.uploader.upload(
            `data:image/png;base64,${base64Image}`,
            {
                folder: "12thResult",
                use_filename: true,
                unique_filename: true,
                quality: "auto:best",
                format: "auto",
                width: 374,
                height: 305,
                crop: "fit",
            }
        );

        const newResult = new twelfthResult({
            firstName,
            lastName,
            imagePath: uploadResponse.secure_url,
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

        res.status(201).json({ message: "Twelfth student result added successfully", success: true, data: savedResult });
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

        res.status(200).json({ message: "Twelfth student results fetched successfully", success: true, data: results });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const editTwelfthStudentResult = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, imagePath, percentage, boardName, seqno, physicsMarks, chemistryMarks, mathMarks, biologyMarks, Tag } = req.body;

        let newImageUrl = imagePath;

        if (imagePath && imagePath.startsWith("data:image")) {
            const base64Image = imagePath.split(";base64,").pop();
            const uploadResponse = await cloudinary.uploader.upload(
                `data:image/png;base64,${base64Image}`,
                {
                    folder: "12thResult",
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

        const result = await twelfthResult.findByIdAndUpdate(
            id,
            {
                firstName,
                lastName,
                imagePath: newImageUrl,
                percentage,
                boardName,
                seqno,
                physicsMarks,
                chemistryMarks,
                mathMarks,
                biologyMarks,
                Tag,
            },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "Twelfth student result not found", success: false });
        }

        res.status(200).json({ message: "Twelfth student result updated successfully", success: true, data: result });
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

export const getTwelfthResultById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await twelfthResult.findById(id);

        if (!result) {
            return res.status(404).json({ message: "Twelfth student result not found", success: false });
        }

        res.status(200).json({ message: "Twelfth student result fetched successfully", success: true, data: result });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};


