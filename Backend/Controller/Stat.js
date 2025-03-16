import Stat from "../Models/Stat.js";

export const addStat = async (req, res) => {
  try {
    const { studentsCount, expertFacultyCount, successRate, yearsOfExperience } = req.body;

    const newStat = new Stat({
      studentsCount,
      expertFacultyCount,
      successRate,
      yearsOfExperience,
    });

    await newStat.save();
    res.status(201).json({ message: "Statistics added successfully", stat: newStat });
  } catch (error) {
    res.status(500).json({ message: "Failed to add statistics", error: error.message });
  }
};


export const getStat = async (req, res) => {
  try {
    const stat = await Stat.findOne();
    res.status(200).json(stat);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve statistics", error: error.message });
  }
};


export const updateStat = async (req, res) => {
  try {
    const { studentsCount, expertFacultyCount, successRate, yearsOfExperience } = req.body;

    const updatedStat = await Stat.findOneAndUpdate(
      {},
      { studentsCount, expertFacultyCount, successRate, yearsOfExperience },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Statistics updated successfully", stat: updatedStat });
  } catch (error) {
    res.status(500).json({ message: "Failed to update statistics", error: error.message });
  }
};
