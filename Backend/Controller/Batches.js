import Batch from '../Models/Batches.js';


export const addBatch = async (req, res) => {
  try {
    const { batchName, startDate } = req.body;

    if (!batchName || !startDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const batch = new Batch({ batchName, startDate });
    await batch.save();

    res.status(201).json({ message: "Batch added successfully.", batch });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



export const updateBatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const { batchName, startDate } = req.body;

    if (!batchName || !startDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    let batch = await Batch.findById(id);

    if (batch) {
      batch.batchName = batchName;
      batch.startDate = startDate;
      await batch.save();
      res.status(200).json({ message: "Batch updated successfully.", batch });
    } else {
      const newBatch = new Batch({ _id: id, batchName, startDate });
      await newBatch.save();
      res.status(201).json({ message: "Batch not found, so a new batch was created.", newBatch });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const getAllBatches = async (req, res) => {
  try {
    const batches = await Batch.find();
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const getBatchById = async (req, res) => {
    try {
      const { id } = req.params;
      const batch = await Batch.findById(id);
  
      if (!batch) {
        return res.status(404).json({ message: "Batch not found." });
      }
  
      res.status(200).json(batch);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };
  
  export const deleteBatchById = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBatch = await Batch.findByIdAndDelete(id);
  
      if (!deletedBatch) {
        return res.status(404).json({ message: "Batch not found." });
      }
  
      res.status(200).json({ message: "Batch deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };