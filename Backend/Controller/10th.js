import tenthResult from '../Models/10th.js';
import cloudinary from 'cloudinary';

export const addStudentResult = async (req, res) => {
    try {
        // console.log(req.body);
        const { firstName, lastName,image, percentage, board, science, math, tags, seqno } = req.body;
        // const image = req.files ? req.files.image : null;
        if (!image) {
            return res.status(400).json({ message: "Image is required", success: false });
        }

        const base64Image = image.split(";base64,").pop(); // Extract base64 string

      // Upload the image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(
        `data:image/png;base64,${base64Image}`,
        {
          folder: "10thResult",
          use_filename: true,
          unique_filename: true,
          quality: "auto:best", // Dynamically adjust quality for best result
          format: "auto", // Automatically select the best image format
          width: 374,
          height: 305,
          crop: "fit", // Maintain original aspect ratio without cropping
        }
      );
      

        console.log(uploadResponse)

        const newResult = new tenthResult({
            firstName,
            lastName,
            imagePath: uploadResponse.secure_url,
            percentage,
            boardName:board,
            scienceMarks:science,
            mathMarks:math,
            Tag:tags,
            seqno:seqno,
        });
        const savedResult = await newResult.save();
        console.log("HII")
        res.status(201).json({ message: "Student result added successfully", success: true, data: savedResult });
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
        res.status(200).json({ message: "Student results fetched successfully", success: true, data: results });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};


export const editStudentResult = async (req, res) => {
    try {
      const { id } = req.params;
      // Destructure the request body with keys matching the frontend.
      const { firstName, lastName, image, percentage, board, science, math, tags, seqno } = req.body;
      
      // Prepare the new image URL.
      let newImageUrl = image;
      // If an image is provided and it is in base64 format (starts with "data:image")
      if (image && image.startsWith("data:image")) {
        const base64Image = image.split(";base64,").pop(); // Extract the base64 string
        // Upload the image to Cloudinary.
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
        newImageUrl = uploadResponse.secure_url;
      }
      
      // Update the student result in the database.
      const result = await tenthResult.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          imagePath: newImageUrl,
          percentage,
          boardName: board,
          scienceMarks: science,
          mathMarks: math,
          Tag: tags,
          seqno,
        },
        { new: true }
      );
  
      if (!result) {
        return res.status(404).json({ message: "Student result not found", success: false });
      }
  
      res.status(200).json({ message: "Student result updated successfully", success: true, data: result });
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

export const getResultById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const results = await tenthResult.findById(id);

        if (!results) {
            return res.status(404).json({ message: "No student results found", success: false });
        }
        console.log(results)
        res.status(200).json({ message: "Student results fetched successfully", success: true, data: results });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};
