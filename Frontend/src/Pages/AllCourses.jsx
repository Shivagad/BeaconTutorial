import React, { useState ,useEffect } from "react";
import {
  BookOpen,
  Clock,
  Users,
  Award,
  Monitor,
  ChevronDown,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const courses = [
  {
    title: "8th, 9th, 10th Foundation",
    description:
      "Build a strong foundation in Science, Mathematics, and Logical Reasoning to excel in competitive exams like NEET, JEE, and Olympiads. This course is designed to strengthen conceptual understanding and problem-solving skills for students in grades 8, 9, and 10.",
    Batch_Starts: "2025-03-20",
    mode: "Offline",
    highlights: [
      "Conceptual clarity in Mathematics and Science",
      "Problem-solving techniques for competitive exams",
      "Logical reasoning and aptitude development",
      "Regular assessments and doubt-solving sessions",
    ],
  },
  {
    title: "8th, 9th, 10th Regular Board Batches",
    description:
      "Strengthen your foundational knowledge in Science, Mathematics, and other core subjects. Designed for students aiming to excel in their board examinations and build a robust base for future competitive exams.",
    Batch_Starts: "2025-03-25",
    mode: "Offline",
    highlights: [
      "Comprehensive coverage of CBSE, ICSE, and SSC syllabi",
      "Experienced faculty with personalized attention",
      "Regular assessments and feedback sessions",
      "Focus on conceptual clarity and problem-solving skills",
    ],
  },
  {
    title: "SSC",
    description:
      "Comprehensive course for SSC board students to help them achieve excellent results in their board exams.",
    Batch_Starts: "2025-04-01",
    mode: "Offline",
    highlights: [
      "Detailed coverage of all SSC subjects",
      "Expert guidance and study materials",
      "Regular tests and performance evaluation",
      "Time management strategies for exams",
    ],
  },
  {
    title: "CBSE",
    description:
      "A complete course designed for CBSE students, focusing on NCERT syllabus with in-depth conceptual clarity.",
    Batch_Starts: "2025-03-18",
    mode: "Offline",
    highlights: [
      "NCERT syllabus-based teaching approach",
      "Chapter-wise tests and revision classes",
      "Doubt-solving and one-on-one mentorship",
      "Performance tracking and progress analysis",
    ],
  },
  {
    title: "ICSE",
    description:
      "A structured program tailored for ICSE students, covering all subjects with conceptual clarity and exam-oriented preparation.",
    Batch_Starts: "2025-04-05",
    mode: "Offline",
    highlights: [
      "Detailed explanation of ICSE syllabus",
      "Regular quizzes and practice tests",
      "Emphasis on English language skills",
      "Time management techniques for exams",
    ],
  },
  {
    title: "11th + 12th Board Classes",
    description:
      "A well-structured program to help students ace their 11th and 12th board exams with proper guidance and study materials.",
    Batch_Starts: "2025-03-22",
    mode: "Offline",
    highlights: [
      "Complete syllabus coverage",
      "Regular practice papers and mock tests",
      "Personalized guidance for weak subjects",
      "Comprehensive revision before exams",
    ],
  },
  {
    title: "11th + 12th JEE Mains + Advance",
    description:
      "Intensive coaching for JEE Mains and Advanced aspirants, focusing on concept clarity and problem-solving techniques.",
    Batch_Starts: "2025-03-30",
    mode: "Offline",
    highlights: [
      "Advanced problem-solving techniques",
      "Daily practice problems and assignments",
      "Doubt-clearing sessions with experts",
      "Mock tests with detailed analysis",
    ],
  },
  {
    title: "11th + 12th NEET",
    description:
      "Comprehensive NEET coaching for 11th and 12th students covering the full syllabus with expert faculty guidance.",
    Batch_Starts: "2025-04-10",
    mode: "Offline",
    highlights: [
      "Thorough NCERT-based teaching",
      "Daily MCQs and mock tests",
      "Doubt-solving sessions",
      "Focus on time management and accuracy",
    ],
  },
  {
    title: "11th + 12th IISER",
    description:
      "Specialized training for IISER entrance, covering physics, chemistry, mathematics, and biology with an emphasis on research-based learning.",
    Batch_Starts: "2025-04-08",
    mode: "Offline",
    highlights: [
      "Concept-based learning approach",
      "Advanced study materials",
      "Problem-solving techniques",
      "Mock exams for better preparation",
    ],
  },
  {
    title: "11th + 12th MHTCET",
    description:
      "Intensive coaching for MHT-CET aspirants, covering physics, chemistry, and mathematics.",
    Batch_Starts: "2025-03-27",
    mode: "Offline",
    highlights: [
      "Concept-based learning with MCQs",
      "Detailed problem-solving sessions",
      "Time management strategies",
      "Full-length mock tests",
    ],
  },
  {
    title: "11th + 12th NDA",
    description:
      "Specialized coaching for NDA entrance exams, covering mathematics, general ability, and physical training.",
    Batch_Starts: "2025-04-12",
    mode: "Offline",
    highlights: [
      "Conceptual learning with exam-oriented approach",
      "Mock tests and previous year paper practice",
      "Interview and personality development training",
      "Physical fitness training guidance",
    ],
  },
  {
    title: "11th + 12th CUET",
    description:
      "CUET preparation course covering aptitude, domain-specific subjects, and logical reasoning.",
    Batch_Starts: "2025-04-18",
    mode: "Offline",
    highlights: [
      "Comprehensive coverage of CUET syllabus",
      "Logical reasoning and quantitative aptitude practice",
      "Time management and speed enhancement techniques",
      "Practice with past year CUET papers",
    ],
  },
  {
    title: "HSC",
    description:
      "Comprehensive HSC board preparation covering all subjects with expert guidance, practice tests, and revision strategies.",
    Batch_Starts: "2025-04-07",
    mode: "Offline",
    highlights: [
      "Full syllabus coverage",
      "Regular mock tests and assessments",
      "Concept clarity with in-depth explanations",
      "Exam-focused preparation strategies",
    ],
  },
  {
    title: "JEE Mains",
    description:
      "Specialized preparation for JEE Mains with conceptual clarity and in-depth problem-solving techniques.",
    Batch_Starts: "2025-03-29",
    mode: "Offline",
    highlights: [
      "Advanced problem-solving methods",
      "Daily assignments and mock tests",
      "Detailed analysis of previous year papers",
      "Time management strategies",
    ],
  },
  {
    title: "JEE Advanced",
    description:
      "Expert-led coaching for JEE Advanced, covering physics, chemistry, and mathematics with a strategic approach.",
    Batch_Starts: "2025-04-03",
    mode: "Offline",
    highlights: [
      "Focus on high-level problem-solving",
      "Regular doubt-clearing sessions",
      "Mock exams with performance tracking",
      "Detailed coverage of difficult topics",
    ],
  },
  {
    title: "JEE (Mains + Advance)",
    description:
      "Intensive coaching for JEE aspirants, covering Mains and Advanced syllabus with problem-solving techniques and mock tests.",
    Batch_Starts: "2025-04-10",
    mode: "Offline",
    highlights: [
      "Advanced problem-solving techniques",
      "Regular JEE mock tests and analysis",
      "Concept-building for Physics, Chemistry, and Mathematics",
      "Personalized doubt-clearing sessions",
    ],
  },
  {
    title: "NEET",
    description:
      "Comprehensive coaching for NEET aspirants covering Physics, Chemistry, and Biology with in-depth conceptual clarity and problem-solving techniques.",
    Batch_Starts: "2025-04-20",
    mode: "Offline",
    highlights: [
      "Complete NEET syllabus coverage",
      "Daily practice tests and performance tracking",
      "Conceptual learning with real-life applications",
      "Exam-focused strategies and time management",
    ],
  },
  {
    title: "NEET Foundation",
    description:
      "A strong foundation course for students aiming for NEET, focusing on fundamental concepts in physics, chemistry, and biology.",
    Batch_Starts: "2025-04-15",
    mode: "Offline",
    highlights: [
      "NCERT-based teaching methodology",
      "Daily MCQs and tests",
      "Concept clarity and application",
      "Mock exams for real-time practice",
    ],
  },
  {
    title: "NEET Repeaters",
    description:
      "Specialized program for NEET repeaters focusing on strengthening weak areas, improving accuracy, and maximizing scores.",
    Batch_Starts: "2025-04-15",
    mode: "Offline",
    highlights: [
      "Complete NEET syllabus revision",
      "Regular practice with previous year papers",
      "Error analysis and time management strategies",
      "Exclusive doubt-solving and mentoring sessions",
    ],
  },
  {
    title: "MHT - CET",
    description:
      "A structured course covering the complete MHT-CET syllabus with problem-solving strategies.",
    Batch_Starts: "2025-03-23",
    mode: "Offline",
    highlights: [
      "MCQ-based learning",
      "Mock tests with answer analysis",
      "Speed enhancement techniques",
      "Detailed concept explanation",
    ],
  },
  {
    title: "NDA",
    description:
      "Comprehensive NDA preparation with subject-wise coaching and personality development training.",
    Batch_Starts: "2025-03-31",
    mode: "Offline",
    highlights: [
      "Full NDA syllabus coverage",
      "Mock tests and interview training",
      "Physical training guidance",
      "Time management strategies",
    ],
  },
  {
    title: "NTSE",
    description:
      "Dedicated course for NTSE aspirants covering the complete syllabus with advanced problem-solving techniques.",
    Batch_Starts: "2025-03-28",
    mode: "Offline",
    highlights: [
      "Conceptual clarity in Mathematics and Science",
      "Logical reasoning and aptitude development",
      "Full-length mock tests",
      "Personalized mentorship",
    ],
  },
  {
    title: "IISER",
    description:
      "Targeted preparation for IISER entrance exams focusing on research-based learning and analytical skills.",
    Batch_Starts: "2025-04-06",
    mode: "Offline",
    highlights: [
      "Concept-based learning",
      "Problem-solving techniques",
      "Mock tests and revisions",
      "Time management tips",
    ],
  },
  {
    title: "CUET",
    description:
      "Focused preparation for CUET aspirants, covering aptitude, subject-specific topics, and exam-oriented practice.",
    Batch_Starts: "2025-04-18",
    mode: "Offline",
    highlights: [
      "Comprehensive coverage of CUET syllabus",
      "Logical reasoning and quantitative aptitude training",
      "Time management and exam strategies",
      "Practice with previous years' CUET papers",
    ],
  },
];


const CourseSection = ({ course }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [batchStartDate, setBatchStartDate] = useState(course.Batch_Starts); 

  useEffect(() => {
    const fetchBatchDate = async () => {
      try {
        const response = await axios.get("http://localhost:4000/server/batches/getallbatch"); 
        const batches = response.data;
        const matchingBatch = batches.find(
          (batch) => batch.batchName.toLowerCase() === course.title.toLowerCase()
        );

        if (matchingBatch) {
          const formattedDate = new Date(matchingBatch.startDate).toISOString().split("T")[0];
          setBatchStartDate(formattedDate);
        }
      } catch (error) {
        console.error("Error fetching batch date:", error);
      }
    };

    fetchBatchDate();
  }, [course.title]);

  const driveFolderUrl = "https://drive.google.com/drive/folders/1Tv9vag9jvWmYPo_1lxop2TLOqIp0Pmjm?usp=sharing";

  return (
    <div className="w-full py-20 px-6 sm:px-6 lg:px-8 border-b border-gray-400 last:border-b-2 bg-white transform transition-all duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-[#8fb7f7] to-[#4e77bb] bg-clip-text text-transparent">
            {course.title}
          </h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 py-2 bg-[#6ba2fa] text-white rounded-lg hover:bg-[#4e77bb] transform transition-all duration-300 hover:scale-105"
          >
            Learn More
            <ChevronDown
              className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          {course.description}
        </p>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-[#4e77bb]" />
            <div>
              <p className="font-semibold text-gray-900">Batch Starts</p>
              <p className="text-gray-600">{batchStartDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Monitor className="w-6 h-6 text-[#4e77bb]" />
            <div>
              <p className="font-semibold text-gray-900">Mode of Learning</p>
              <p className="text-gray-600">{course.mode}</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              Course Highlights
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 p-5">
              {course.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-[#4e77bb] rounded-full" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between md:col-span-2 gap-4">
            <a
              href={driveFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-[#0d6efd] text-white rounded-lg font-semibold hover:bg-[#0a58ca] transition-colors w-full md:w-auto text-center"
            >
              Read More
            </a>

            <button
              onClick={() => {
                navigate("/inquiry");
                window.scrollTo(0, 0);
              }}
              className="px-8 py-3 bg-[#0d6efd] text-white rounded-full font-semibold hover:bg-[#0a58ca] transition-colors w-full md:w-auto"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



const AllCourses = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-orange-50">
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Featured Courses
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our carefully curated selection of courses designed to
              help you master the skills you need for success in today's digital
              world.
            </p>
          </div>
        </div>

        <div className="divide-y">
          {courses.map((course, index) => (
            <CourseSection key={index} course={course} />
          ))}
        </div>
        <div className="bg-white text-[#E85900] py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Your Journey Today
            </h2>
            <p className="mb-8 text-lg">
              Join thousands of successful students who achieved their dreams
              with us
            </p>
            <button
              onClick={() => {
                navigate("/inquiry");
                window.scrollTo(0, 0);
              }}
              className="bg-[#E85900] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#faa975] hover:text-black transition-colors"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllCourses;
