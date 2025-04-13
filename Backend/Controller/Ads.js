import Ads from '../Models/Ads.js';

export const addAd = async (req, res) => {
  try {
    const { title, videoLink } = req.body;  // Accept videoLink instead of file
    console.log(title);
    console.log(videoLink);

    if (!title || !videoLink) {
      return res.status(400).json({ message: "Title and video link are required", success: false });
    }

    // Assuming you want to save the YouTube link directly
    const newAd = new Ads({
      title,
      videoUrl: videoLink,  // Store the YouTube link
    });

    const savedAd = await newAd.save();
    res.status(201).json({ message: "Ad added successfully", success: true, data: savedAd });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getAllAds = async (req, res) => {
  try {
    const ads = await Ads.find();
    if (!ads.length) {
      return res.status(404).json({ message: "No ads found", success: false });
    }
    res.status(200).json({ message: "Ads fetched successfully", success: true, data: ads });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getAdById = async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Ads.findById(id);
    if (!ad) {
      return res.status(404).json({ message: "Ad not found", success: false });
    }
    res.status(200).json({ message: "Ad fetched successfully", success: true, data: ad });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const deleteAd = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAd = await Ads.findByIdAndDelete(id);
    if (!deletedAd) {
      return res.status(404).json({ message: "Ad not found", success: false });
    }
    res.status(200).json({ message: "Ad deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
