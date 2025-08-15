import Result from "../Models/ResultSchema.js";

export const getAllStudentsAverageAnalysis = async (req, res) => {
  try {
    const results = await Result.find();
    if (results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }

    const examMap = {};

    results.forEach((result) => {
      const exam = result.exam;
      if (!examMap[exam]) {
        examMap[exam] = {
          totalMarks: 0,
          totalOutOf: 0,
          count: 0,
          correctAnswers: 0,
          incorrectAnswers: 0,
          notAttempted: 0,
          physics: 0,
          chemistry: 0,
          maths: 0,
          biology: 0,
          date: result.examDate,
        };
      }

      const stats = examMap[exam];
      stats.totalMarks += result.totalMarks || 0;
      stats.totalOutOf += result.outof || 0;
      stats.count += 1;
      stats.correctAnswers += result.correctAnswers || 0;
      stats.incorrectAnswers += result.incorrectAnswers || 0;
      stats.notAttempted += result.notAttempted || 0;
      stats.physics += result.physics || 0;
      stats.chemistry += result.chemistry || 0;
      stats.maths += result.maths || 0;
      stats.biology += result.biology || 0;
    });

    const analysis = Object.entries(examMap).map(([exam, stats]) => ({
      exam,
      totalStudents: stats.count,
      date: stats.date,  // Adding the date field to the response
      averageMarks: (stats.totalMarks / stats.count).toFixed(2),
      averagePercentage: ((stats.totalMarks / stats.totalOutOf) * 100).toFixed(2),
      avgCorrectAnswers: (stats.correctAnswers / stats.count).toFixed(1),
      avgIncorrectAnswers: (stats.incorrectAnswers / stats.count).toFixed(1),
      avgNotAttempted: (stats.notAttempted / stats.count).toFixed(1),
      avgPhysics: (stats.physics / stats.count).toFixed(1),
      avgChemistry: (stats.chemistry / stats.count).toFixed(1),
      avgMaths: (stats.maths / stats.count).toFixed(1),
      avgBiology: (stats.biology / stats.count).toFixed(1),
    }));

    res.status(200).json({ analysis });
  } catch (error) {
    console.error("Error fetching analysis:", error);
    res.status(500).json({ message: "Server error" });
  }
};
