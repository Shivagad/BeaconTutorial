import OtherExamResult from '../Models/OtherExamResults.js';
import cloudinary from 'cloudinary';

export const addOtherExamResult = async (req, res) => {
    try {
        const { firstName, lastName, imagePath, ExamName, seqno, Tag } = req.body;
        // // console.log(req.body);

        if (!imagePath) {
            return res.status(400).json({ message: "Image is required", success: false });
        }

        const base64Image = imagePath.split(";base64,").pop();
        const uploadResponse = await cloudinary.uploader.upload(
            `data:image/png;base64,${base64Image}`,
            {
                folder: "OtherExamResults",
                use_filename: true,
                unique_filename: true,
                quality: "auto:best",
                format: "auto",
                width: 374,
                height: 305,
                crop: "fit",
            }
        );

        const newResult = new OtherExamResult({
            firstName,
            lastName,
            imagePath: uploadResponse.secure_url,
            ExamName,
            seqno,
            Tag,
        });

        const savedResult = await newResult.save();

        res.status(201).json({ message: "Other Exam student result added successfully", success: true, data: savedResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, success: false });
    }
};

export const getAllOtherExamResults = async (req, res) => {
    try {
        const results = await OtherExamResult.find();

        if (!results || results.length === 0) {
            return res.status(404).json({ message: "No Other Exam student results found", success: false });
        }

        res.status(200).json({ message: "Other Exam student results fetched successfully", success: true, data: results });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const getOtherExamResultById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await OtherExamResult.findById(id);

        if (!result) {
            return res.status(404).json({ message: "Other Exam student result not found", success: false });
        }

        res.status(200).json({ message: "Other Exam student result fetched successfully", success: true, data: result });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};


export const editOtherExamResult = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, imagePath, ExamName, seqno, Tag } = req.body;

        let newImageUrl = imagePath;
        let oldImagePublicId = null;

        // Fetch the existing record
        const existingResult = await OtherExamResult.findById(id);
        if (!existingResult) {
            return res.status(404).json({ message: "Other Exam student result not found", success: false });
        }

        // Extract public ID from existing image URL
        if (existingResult.imagePath) {
            const urlParts = existingResult.imagePath.split('/');
            const filenameWithExt = urlParts[urlParts.length - 1]; // Get last part of URL (filename.ext)
            const publicId = filenameWithExt.split('.')[0]; // Remove file extension
            oldImagePublicId = `OtherExamResults/${publicId}`; // Full Cloudinary public ID
        }

        // Upload new image if provided
        if (imagePath && imagePath.startsWith("data:image")) {
            const base64Image = imagePath.split(";base64,").pop();
            const uploadResponse = await cloudinary.uploader.upload(
                `data:image/png;base64,${base64Image}`,
                {
                    folder: "OtherExamResults",
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

        // Update database with new image URL
        const result = await OtherExamResult.findByIdAndUpdate(
            id,
            { firstName, lastName, imagePath: newImageUrl, ExamName, seqno, Tag },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "Other Exam student result not found", success: false });
        }

        // Delete old image from Cloudinary if new image is uploaded
        if (oldImagePublicId && imagePath.startsWith("data:image")) {
            await cloudinary.uploader.destroy(oldImagePublicId);
        }
        
        res.status(200).json({ message: "Other Exam student result updated successfully", success: true, data: result });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const deleteOtherExamResult = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await OtherExamResult.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Other Exam student result not found", success: false });
        }

        res.status(200).json({ message: "Other Exam student result deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};
