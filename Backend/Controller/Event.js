import EventGallery from '../Models/Event.js';
import cloudinary from 'cloudinary';

// Add a new event to the gallery
export const addEventGallery = async (req, res) => {
    try {
        const { eventName, year, imagesPath, description } = req.body;

        if (!imagesPath || imagesPath.length === 0) {
            return res.status(400).json({ message: "At least one image is required", success: false });
        }

        // Handle image upload to Cloudinary
        const imageUrls = [];
        for (const image of imagesPath) {
            const base64Image = image.split(";base64,").pop();
            const uploadResponse = await cloudinary.uploader.upload(
                `data:image/png;base64,${base64Image}`,
                {
                    folder: "EventGallery",
                    use_filename: true,
                    unique_filename: true,
                    quality: "auto:best",
                    format: "auto",
                    width: 500,
                    height: 700,
                    crop: "fit",
                }
            );
            imageUrls.push(uploadResponse.secure_url);
        }

        const newEvent = new EventGallery({
            eventName,
            year,
            imagesPath: imageUrls,
            description,
        });

        const savedEvent = await newEvent.save();

        res.status(201).json({ message: "Event added successfully", success: true, data: savedEvent });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

// Get all events from the gallery
export const getAllEvents = async (req, res) => {
    try {
        const events = await EventGallery.find();

        if (!events || events.length === 0) {
            return res.status(404).json({ message: "No events found", success: false });
        }

        res.status(200).json({ message: "Events fetched successfully", success: true, data: events });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

// Edit an event in the gallery
export const editEventGallery = async (req, res) => {
    try {
      const { id } = req.params;
      const { eventName, year, imagesPath, description } = req.body;
      let updatedImageUrls = [];
  
      if (imagesPath && imagesPath.length > 0) {
        for (const image of imagesPath) {
          // Check if image is a new Base64 string.
          if (typeof image === "string" && image.startsWith("data:image")) {
            const base64Image = image.split(";base64,").pop();
            const uploadResponse = await cloudinary.uploader.upload(
              `data:image/png;base64,${base64Image}`,
              {
                folder: "EventGallery",
                use_filename: true,
                unique_filename: true,
                quality: "auto:best",
                format: "auto",
                width: 500,
                height: 700,
                crop: "fit",
              }
            );
            updatedImageUrls.push(uploadResponse.secure_url);
          }
          // If image is an object with a base64 property.
          else if (typeof image === "object" && image.base64) {
            const base64Image = image.base64.split(";base64,").pop();
            const uploadResponse = await cloudinary.uploader.upload(
              `data:image/png;base64,${base64Image}`,
              {
                folder: "EventGallery",
                use_filename: true,
                unique_filename: true,
                quality: "auto:best",
                format: "auto",
                width: 500,
                height: 700,
                crop: "fit",
              }
            );
            updatedImageUrls.push(uploadResponse.secure_url);
          }
          // Otherwise, assume it's an existing URL.
          else {
            updatedImageUrls.push(image);
          }
        }
      }
  
      const updatedEvent = await EventGallery.findByIdAndUpdate(
        id,
        { eventName, year, imagesPath: updatedImageUrls, description },
        { new: true }
      );
  
      if (!updatedEvent) {
        return res.status(404).json({ message: "Event not found", success: false });
      }
  
      res.status(200).json({ message: "Event updated successfully", success: true, data: updatedEvent });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  };


export const deleteEventGallery = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await EventGallery.findByIdAndDelete(id);

        if (!event) {
            return res.status(404).json({ message: "Event not found", success: false });
        }
        res.status(200).json({ message: "Event deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await EventGallery.findById(id);

        if (!event) {
            return res.status(404).json({ message: "Event not found", success: false });
        }

        res.status(200).json({ message: "Event fetched successfully", success: true, data: event });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};
