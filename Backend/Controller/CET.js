import CETResult from '../Models/CET.js';
import cloudinary from 'cloudinary';

export const addCETStudentResult = async (req, res) => {
    try {
        const { firstName, lastName, college,image, totalPercentile, AIR, mathematicsPercentile, physicsPercentile, chemistryPercentile, biologyPercentile, seqno, Tag } = req.body;
        

        if (!image) {
            return res.status(400).json({ message: "Image is required", success: false });
        }
            const base64Image = image.split(";base64,").pop(); 
             const uploadResponse = await cloudinary.uploader.upload(
               `data:image/png;base64,${base64Image}`,
               {
                 folder: "10thResult",
                 use_filename: true,
                 unique_filename: true,
                 quality: "auto:best",
                 format: "auto", 
                 width: 374,
                 height: 305,
                 crop: "fit",
               }
             );

        const newResult = new CETResult({
            firstName,
            lastName,
            imagePath: uploadResult.secure_url,
            college,
            totalPercentile,
            AIR,
            mathematicsPercentile,
            physicsPercentile,
            chemistryPercentile,
            biologyPercentile,
            seqno,
            Tag,
        });

        const savedResult = await newResult.save();

        res.status(201).json({ message: "CET student result added successfully", success: true, result: savedResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, success: false });
    }
};

export const getAllCETStudentResults = async (req, res) => {
    try {
        const results = await CETResult.find();

        if (!results || results.length === 0) {
            return res.status(404).json({ message: "No CET student results found", success: false });
        }

        res.status(200).json({ message: "CET student results fetched successfully", success: true, results });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const editCETStudentResult = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, imagePath, college, totalPercentile, AIR, mathematicsPercentile, physicsPercentile, chemistryPercentile, biologyPercentile, seqno, Tag } = req.body;

        const result = await CETResult.findByIdAndUpdate(id, {
            firstName,
            lastName,
            imagePath,
            college,
            totalPercentile,
            AIR,
            mathematicsPercentile,
            physicsPercentile,
            chemistryPercentile,
            biologyPercentile,
            seqno,
            Tag
        }, { new: true });

        if (!result) {
            return res.status(404).json({ message: "CET student result not found", success: false });
        }

        res.status(200).json({ message: "CET student result updated successfully", success: true, result });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const deleteCETStudentResult = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await CETResult.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "CET student result not found", success: false });
        }

        res.status(200).json({ message: "CET student result deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};
