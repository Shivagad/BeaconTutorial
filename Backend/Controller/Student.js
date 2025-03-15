import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import fs from "fs";
import csv from "csv-parser";
import Student from "../Models/Student.js";
import Course from "../Models/Course.js";
import Result from "../Models/ResultSchema.js";
import { Parser } from "json2csv";

dotenv.config();
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("course", "name");
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch students" });
  }
};

// Get a single student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate(
      "course",
      "name"
    );
    if (!student)
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch student" });
  }
};

export const checkStudentEmail = async (req, res) => {
  try {
    console.log(req.body);
    const { email, dob } = req.body;

    // Find student by email
    const student = await Student.findOne({ email });

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    const storedDOB = new Date(student.dob).toISOString().split("T")[0];

    if (storedDOB === dob) {
      return res
        .status(200)
        .json({ name: student.name, success: true, message: "Student found" });
    } else {
      return res
        .status(401)
        .json({
          success: false,
          message: "Unauthorized: Incorrect Date of Birth",
        });
    }
  } catch (error) {
    console.error("Error checking student email:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch student",
        error: error.message,
      });
  }
};

export const resetStudentPassword = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    student.password = hashedPassword;
    await student.save();
    return res.status(200).json({ success: true, message: "Student found" });
  } catch (error) {
    console.error("Error checking student email:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch student",
        error: error.message,
      });
  }
};

export const createStudent = async (req, res) => {
  try {
    const {
      name,
      rollNo,
      fatherName,
      motherName,
      parentEmail,
      email,
      password,
      mobile,
      fatherMobile,
      address,
      state,
      city,
      gender,
      dob,
      admissionYear,
      course,
    } = req.body;

    console.log(req.body);


    const existingStudent = await Student.findOne({ email });
    
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student with this email already exists",
      });
    }

    const courseExists = await Course.findOne({ name: course });
    if (!courseExists) {
      return res
        .status(400)
        .json({ success: false, message: "Course does not exist" });
    }
    const courseId = courseExists._id;
 
    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      name,
      rollNo,
      fatherName,
      motherName,
      parentEmail,
      email,
      password: hashedPassword,
      mobile,
      fatherMobile,
      address,
      state,
      city,
      gender,
      dob,
      admissionYear,
      course: courseId,
    });
    // console.log(student);
    try {
      await student.save();
      console.log("Student saved successfully"); // Log success message
    } catch (error) {
      console.error("Student save failed:", error); // Log detailed error message
      res.status(500).json({
        success: false,
        message: "Student creation failed",
        error: error.message,
      });
    }
    res.status(201).json({
      success: true,
      message: "Student created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Student creation failed",
      error: error.message,
    });
  }
};


// Update a student
export const updateStudent = async (req, res) => {
  try {
    const {
      name,
      rollNo,
      fatherName,
      motherName,
      parentEmail,
      email,
      mobile,
      fatherMobile,
      address,
      state,
      city,
      gender,
      dob,
      admissionYear,
      course,
      password,
    } = req.body;

    const courseExists = await Course.findById(course);
    if (!courseExists) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid course ID" });
    }

    let updateData = {
      name,
      rollNo,
      fatherName,
      motherName,
      parentEmail,
      email,
      mobile,
      fatherMobile,
      address,
      state,
      city,
      gender,
      dob,
      admissionYear,
      course: courseExists._id,
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const student = await Student.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!student)
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });

    res
      .status(200)
      .json({
        success: true,
        message: "Student updated successfully",
        student,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update student" });
  }
};

// Delete a student
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student)
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });

    await Result.deleteMany({ student: student._id });

    await Student.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({
        success: true,
        message: "Student and associated results deleted successfully",
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to delete student and results",
        error: error.message,
      });
  }
};

export const deleteAllCourseStudent = async (req, res) => {
  try {
    const { course } = req.params;

    if (!course) {
      return res.status(400).json({ message: "Course parameter is required." });
    }

    const courseData = await Course.findOne({
      name: { $regex: new RegExp(`^${course}$`, "i") },
    });

    if (!courseData) {
      return res.status(404).json({ message: "Course not found." });
    }

    const students = await Student.find({ course: courseData._id });

    if (students.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found for this course." });
    }

    const studentIds = students.map((student) => student._id);

    await Result.deleteMany({ student: { $in: studentIds } });

    await Student.deleteMany({ course: courseData._id });

    res
      .status(200)
      .json({
        message:
          "All students and their associated results deleted successfully.",
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error deleting students and results",
        error: error.message,
      });
  }
};

// Upload students via CSV
export const uploadStudentsCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "CSV file is required" });
    }

    const students = [];
    const filePath = req.file.path;
    const readStream = fs.createReadStream(filePath).pipe(csv());

    for await (const row of readStream) {
      // Expect CSV headers to match field names (adjust as needed)
      const {
        name,
        rollNo,
        fatherName,
        motherName,
        parentEmail,
        email,
        password,
        mobile,
        fatherMobile,
        address,
        state,
        city,
        gender,
        dob,
        admissionYear,
        course,
      } = row;
      console.log("Processing:", row);

      const existingStudent = await Student.findOne({
        $or: [{ email }],
      });
      if (existingStudent) {
        console.warn(
          `Student with email "${email}"  already exists. Skipping.`
        );
        continue;
      }

      const courseExists = await Course.findOne({
        name: { $regex: new RegExp(`^${course}$`, "i") },
      });
      console.log(courseExists);
      if (!courseExists) {
        console.error(`Course "${course}" not found. Skipping.`);
        continue;
      }

      const courseId = courseExists._id;
      const hashedPassword = await bcrypt.hash(password, 10);
      const parseDOB = (dob) => {
        const [day, month, year] = dob.split("-");
        return new Date(`${year}-${month}-${day}`);
      };

      students.push({
        name,
        rollNo,
        fatherName,
        motherName,
        parentEmail,
        email,
        password: hashedPassword,
        mobile,
        fatherMobile,
        address,
        state,
        city,
        gender,
        dob: parseDOB(dob),
        admissionYear: Number(admissionYear),
        course: courseId,
      });
    }

    fs.unlinkSync(filePath);

    if (students.length > 0) {
      const insertedStudents = await Student.insertMany(students);
      console.log("Inserted Students:", insertedStudents);
      res
        .status(201)
        .json({
          success: true,
          message: "CSV uploaded successfully",
          students: insertedStudents,
        });
    } else {
      res
        .status(400)
        .json({
          success: false,
          message: "No valid students were added. Check CSV data.",
        });
    }
  } catch (error) {
    console.error("CSV upload failed:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "CSV upload failed",
        error: error.message,
      });
  }
};

// Student Login
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Student.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    res
      .status(200)
      .json({ success: true, token, user, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

export const downloadCourseCSV = async (req, res) => {
  try {
    const { course } = req.params;

    if (!course) {
      return res.status(400).json({ message: "Course parameter is required." });
    }

    // Find the course by name (case-insensitive search)
    const courseData = await Course.findOne({
      name: { $regex: new RegExp(`^${course}$`, "i") },
    });

    if (!courseData) {
      return res.status(404).json({ message: "Course not found." });
    }

    // Query students for this course and convert to plain JavaScript objects
    const students = await Student.find({ course: courseData._id }).lean();

    if (students.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found for this course." });
    }

    // Define the CSV fields/columns
    const fields = [
      "name",
      "rollNo",
      "fatherName",
      "motherName",
      "parentEmail",
      "email",
      "mobile",
      "fatherMobile",
      "address",
      "state",
      "city",
      "gender",
      "dob",
      "admissionYear",
    ];

    const json2csvParser = new Parser({ fields });
    const csvData = json2csvParser.parse(students);
    res.header("Content-Type", "text/csv");
    res.attachment(`${course}_students.csv`);
    res.status(200).send(csvData);
  } catch (error) {
    console.error("Error exporting course student CSV:", error);
    res.status(500).json({ error: "Failed to export course student CSV" });
  }
};

export const addResult = async (req, res) => {
  try {
    const {
      studentEmail,
      exam,
      examDate,
      totalMarks,
      rank,
      correctAnswers,
      incorrectAnswers,
      notAttempted,
      physics,
      physicsSectionA,
      physicsSectionB,
      chemistry,
      chemistrySectionA,
      chemistrySectionB,
      maths,
      mathsSectionA,
      mathsSectionB,
      biology,
      biologySectionA,
      biologySectionB,
      outof,
    } = req.body;
    const student = await Student.findOne({ email: studentEmail });
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }
    const newResult = new Result({
      student: student._id,
      exam,
      examDate,
      totalMarks,
      outof,
      rank,
      correctAnswers,
      incorrectAnswers,
      notAttempted,
      physics,
      physicsSectionA,
      physicsSectionB,
      chemistry,
      chemistrySectionA,
      chemistrySectionB,
      maths,
      mathsSectionA,
      mathsSectionB,
      biology,
      biologySectionA,
      biologySectionB,
    });
    try {
      await newResult.save();
      console.log("Student result added successfully");
      student.results.push(newResult._id);
      await student.save();
      console.log(student);
      res
        .status(201)
        .json({
          success: true,
          message: "Result added successfully",
          result: newResult,
        });
    } catch (error) {
      console.error("Error saving student result:", error.message);
      res
        .status(500)
        .json({
          success: false,
          message: "Error saving result",
          error: error.message,
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error adding result",
        error: error.message,
      });
  }
};

export const getResultsByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // Find student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // Fetch all results for the student
    const results = await Result.find({ student: student._id });
    console.log(results);

    res.json({ success: true, results });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching results",
        error: error.message,
      });
  }
};

export const getResultsDetail = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const result = await Result.findById(id);
    res.json({ success: true, result });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const uploadStudentResultCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "CSV file is required" });
    }

    const results = [];
    const filePath = req.file.path;
    const readStream = fs.createReadStream(filePath).pipe(csv());

    for await (const row of readStream) {
      const {
        studentEmail,
        exam,
        examDate,
        totalMarks,
        outof,
        rank,
        correctAnswers,
        incorrectAnswers,
        notAttempted,
        physics,
        physicsSectionA,
        physicsSectionB,
        chemistry,
        chemistrySectionA,
        chemistrySectionB,
        maths,
        mathsSectionA,
        mathsSectionB,
        biology,
        biologySectionA,
        biologySectionB,
      } = row;

      const student = await Student.findOne({ email: studentEmail.trim() });
      if (!student) {
        console.warn(
          `Student with email "${studentEmail}" not found. Skipping.`
        );
        continue;
      }

      // Convert examDate to a valid Date object
      // Parse the date manually (Expecting format: DD-MM-YYYY)
      const [day, month, year] = examDate.trim().split("-");
      const parsedExamDate = new Date(`${year}-${month}-${day}`);

      if (isNaN(parsedExamDate)) {
        console.warn(
          `Invalid date format for examDate: "${examDate}". Skipping.`
        );
        continue;
      }

      const newResult = new Result({
        student: student._id,
        exam: exam.trim(),
        examDate: parsedExamDate,
        totalMarks: Number(totalMarks),
        outof: Number(outof),
        rank,
        correctAnswers: Number(correctAnswers),
        incorrectAnswers: Number(incorrectAnswers),
        notAttempted: Number(notAttempted),
        physics: Number(physics),
        physicsSectionA: Number(physicsSectionA),
        physicsSectionB: Number(physicsSectionB),
        chemistry: Number(chemistry),
        chemistrySectionA: Number(chemistrySectionA),
        chemistrySectionB: Number(chemistrySectionB),
        maths: Number(maths),
        mathsSectionA: Number(mathsSectionA),
        mathsSectionB: Number(mathsSectionB),
        biology: Number(biology),
        biologySectionA: Number(biologySectionA),
        biologySectionB: Number(biologySectionB),
      });

      await newResult.save();

      student.results.push(newResult._id);
      await student.save();

      results.push(newResult);
    }

    fs.unlinkSync(filePath);

    if (results.length > 0) {
      res
        .status(201)
        .json({ success: true, message: "CSV uploaded successfully", results });
    } else {
      res
        .status(400)
        .json({
          success: false,
          message: "No valid results were added. Check CSV data.",
        });
    }
  } catch (error) {
    console.error("CSV upload failed:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "CSV upload failed",
        error: error.message,
      });
  }
};

// Delete a result by student email and exam name
export const deleteResultByEmail = async (req, res) => {
  let { studentEmail, examName } = req.body;
  console.log(req.body);
  try {
    // Trim inputs
    studentEmail = studentEmail.trim();
    examName = examName.trim();

    // Find the student by email
    const student = await Student.findOne({ email: studentEmail });

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // Find the result to delete (case-insensitive)
    const result = await Result.findOneAndDelete({
      student: student._id,
      exam: { $regex: new RegExp(`^${examName}$`, "i") }, // Case-insensitive match
    });

    if (!result) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Result not found for the given exam name",
        });
    }

    student.results = student.results.filter(
      (resultId) => resultId.toString() !== result._id.toString()
    );
    await student.save();

    return res.json({ success: true, message: "Result deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteResultByExamName = async (req, res) => {
  let { examName } = req.body;
  console.log(req.body);

  try {
    examName = examName.trim();

    const results = await Result.find({
      exam: { $regex: new RegExp(`^${examName}$`, "i") },
    });

    if (results.length === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No results found for the given exam name",
        });
    }

    // Delete all results found
    const resultIds = results.map((result) => result._id);
    await Result.deleteMany({ _id: { $in: resultIds } });

    // Update each related student
    const studentIds = [
      ...new Set(results.map((result) => result.student.toString())),
    ];

    for (const studentId of studentIds) {
      const student = await Student.findById(studentId);
      if (student) {
        student.results = student.results.filter(
          (resultId) => !resultIds.includes(resultId.toString())
        );
        await student.save();
      }
    }

    return res.json({ success: true, message: "Results deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
