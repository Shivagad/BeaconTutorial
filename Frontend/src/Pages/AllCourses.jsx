import React, { useState } from "react"
import { BookOpen, Clock, Users, Award, ChevronDown } from "lucide-react"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import { useNavigate } from "react-router-dom"
const courses = [
  {
    title: "8th, 9th, 10th Foundation",
    description:
      "Build a strong foundation in Science, Mathematics, and Logical Reasoning to excel in competitive exams like NEET, JEE, and Olympiads. This course is designed to strengthen conceptual understanding and problem-solving skills for students in grades 8, 9, and 10.",
    duration: "16 weeks",
    students: "180+",
    level: "Advanced",
    highlights: [
      "Conceptual clarity in Mathematics and Science",
      " Problem-solving techniques for competitive exams",
      "Logical reasoning and aptitude development",
      "Hands-on practice with real-world applications",
      "Regular assessments and doubt-solving sessions",
    ]
  },
  {
    "title": "8th, 9th, 10th Regular Board Batches",
    "description": "Strengthen your foundational knowledge in Science, Mathematics, and other core subjects. Designed for students aiming to excel in their board examinations and build a robust base for future competitive exams.",
    "duration": "16 weeks",
    "students": "180+",
    "level": "Intermediate",
    "highlights": [
      "Comprehensive coverage of CBSE, ICSE, and SSC syllabi",
      "Experienced faculty with personalized attention",
      "Regular assessments and feedback sessions",
      "Focus on conceptual clarity and problem-solving skills"
    ]
  },
  
  {
    title: "SSC",
    description:
      "Master modern web development with this comprehensive bootcamp. Learn React, Node.js, and cutting-edge web technologies. Build real-world projects and develop a strong portfolio.",
    duration: "12 weeks",
    students: "250+",
    level: "Intermediate to Advanced",
    highlights: [
      "Full-stack JavaScript development",
      "Modern frameworks and tools",
      "Real-world project experience",
      "Industry-standard best practices"
    ]
  },
  {
    title: "CBSE",
    description:
      "Dive deep into the world of data science and machine learning. Learn to analyze complex datasets, build predictive models, and make data-driven decisions. Perfect for aspiring data scientists and analysts.",
    duration: "16 weeks",
    students: "180+",
    level: "Advanced",
    highlights: [
      "Statistical analysis and visualization",
      "Machine learning algorithms",
      "Deep learning fundamentals",
      "Big data processing"
    ]
  },
  {
    title: "ICSE",
    description:
      "Transform your design skills with our comprehensive UI/UX masterclass. Learn the principles of user-centered design, prototyping, and modern design tools. Create stunning interfaces that users love.",
    duration: "10 weeks",
    students: "150+",
    level: "Beginner to Intermediate",
    highlights: [
      "Design thinking methodology",
      "User research techniques",
      "Interactive prototyping",
      "Portfolio development"
    ]
  },
  {
    title: "11th + 12th Board Classes",
    description:
      "Dive deep into the world of data science and machine learning. Learn to analyze complex datasets, build predictive models, and make data-driven decisions. Perfect for aspiring data scientists and analysts.",
    duration: "16 weeks",
    students: "180+",
    level: "Advanced",
    highlights: [
      "Statistical analysis and visualization",
      "Machine learning algorithms",
      "Deep learning fundamentals",
      "Big data processing"
    ]
  },
  {
    title: "11th + 12th JEE Mains + Advance",
    description:
      "Dive deep into the world of data science and machine learning. Learn to analyze complex datasets, build predictive models, and make data-driven decisions. Perfect for aspiring data scientists and analysts.",
    duration: "16 weeks",
    students: "180+",
    level: "Advanced",
    highlights: [
      "Statistical analysis and visualization",
      "Machine learning algorithms",
      "Deep learning fundamentals",
      "Big data processing"
    ]
  },
  {
    title: "11th + 12th NEET",
    description:
      "Dive deep into the world of data science and machine learning. Learn to analyze complex datasets, build predictive models, and make data-driven decisions. Perfect for aspiring data scientists and analysts.",
    duration: "16 weeks",
    students: "180+",
    level: "Advanced",
    highlights: [
      "Statistical analysis and visualization",
      "Machine learning algorithms",
      "Deep learning fundamentals",
      "Big data processing"
    ]
  },
  {
    title: "11th + 12th IISER",
    description:
      "Dive deep into the world of data science and machine learning. Learn to analyze complex datasets, build predictive models, and make data-driven decisions. Perfect for aspiring data scientists and analysts.",
    duration: "16 weeks",
    students: "180+",
    level: "Advanced",
    highlights: [
      "Statistical analysis and visualization",
      "Machine learning algorithms",
      "Deep learning fundamentals",
      "Big data processing"
    ]
  },
  {
    title: "11th + 12th MHTCET",
    description:
      "Dive deep into the world of data science and machine learning. Learn to analyze complex datasets, build predictive models, and make data-driven decisions. Perfect for aspiring data scientists and analysts.",
    duration: "16 weeks",
    students: "180+",
    level: "Advanced",
    highlights: [
      "Statistical analysis and visualization",
      "Machine learning algorithms",
      "Deep learning fundamentals",
      "Big data processing"
    ]
  },
  {
    title: "11th + 12th NDA",
    description:
      "Dive deep into the world of data science and machine learning. Learn to analyze complex datasets, build predictive models, and make data-driven decisions. Perfect for aspiring data scientists and analysts.",
    duration: "16 weeks",
    students: "180+",
    level: "Advanced",
    highlights: [
      "Statistical analysis and visualization",
      "Machine learning algorithms",
      "Deep learning fundamentals",
      "Big data processing"
    ]
  },
  {
    title: "11th + 12th CUET",
    description:
      "Dive deep into the world of data science and machine learning. Learn to analyze complex datasets, build predictive models, and make data-driven decisions. Perfect for aspiring data scientists and analysts.",
    duration: "16 weeks",
    students: "180+",
    level: "Advanced",
    highlights: [
      "Statistical analysis and visualization",
      "Machine learning algorithms",
      "Deep learning fundamentals",
      "Big data processing"
    ]
  },
  {
    title: "HSC",
    description:
      "Master modern web development with this comprehensive bootcamp. Learn React, Node.js, and cutting-edge web technologies. Build real-world projects and develop a strong portfolio.",
    duration: "12 weeks",
    students: "250+",
    level: "Intermediate to Advanced",
    highlights: [
      "Full-stack JavaScript development",
      "Modern frameworks and tools",
      "Real-world project experience",
      "Industry-standard best practices"
    ]
  },
  {
    title: "JEE Mains",
    description:
      "Dive deep into the world of data science and machine learning. Learn to analyze complex datasets, build predictive models, and make data-driven decisions. Perfect for aspiring data scientists and analysts.",
    duration: "16 weeks",
    students: "180+",
    level: "Advanced",
    highlights: [
      "Statistical analysis and visualization",
      "Machine learning algorithms",
      "Deep learning fundamentals",
      "Big data processing"
    ]
  },
  {
    title: "JEE Advanced",
    description:
      "Transform your design skills with our comprehensive UI/UX masterclass. Learn the principles of user-centered design, prototyping, and modern design tools. Create stunning interfaces that users love.",
    duration: "10 weeks",
    students: "150+",
    level: "Beginner to Intermediate",
    highlights: [
      "Design thinking methodology",
      "User research techniques",
      "Interactive prototyping",
      "Portfolio development"
    ]
  },
  {
    title: "JEE (Mains + Advance)",
    description:
      "Transform your design skills with our comprehensive UI/UX masterclass. Learn the principles of user-centered design, prototyping, and modern design tools. Create stunning interfaces that users love.",
    duration: "10 weeks",
    students: "150+",
    level: "Beginner to Intermediate",
    highlights: [
      "Design thinking methodology",
      "User research techniques",
      "Interactive prototyping",
      "Portfolio development"
    ]
  },
  {
    title: "NEET",
    description:
      "Transform your design skills with our comprehensive UI/UX masterclass. Learn the principles of user-centered design, prototyping, and modern design tools. Create stunning interfaces that users love.",
    duration: "10 weeks",
    students: "150+",
    level: "Beginner to Intermediate",
    highlights: [
      "Design thinking methodology",
      "User research techniques",
      "Interactive prototyping",
      "Portfolio development"
    ]
  },
  {
    title: "NEET Foundation",
    description:
      "Transform your design skills with our comprehensive UI/UX masterclass. Learn the principles of user-centered design, prototyping, and modern design tools. Create stunning interfaces that users love.",
    duration: "10 weeks",
    students: "150+",
    level: "Beginner to Intermediate",
    highlights: [
      "Design thinking methodology",
      "User research techniques",
      "Interactive prototyping",
      "Portfolio development"
    ]
  },
  {
    title: "NEET Repeaters",
    description:
      "Transform your design skills with our comprehensive UI/UX masterclass. Learn the principles of user-centered design, prototyping, and modern design tools. Create stunning interfaces that users love.",
    duration: "10 weeks",
    students: "150+",
    level: "Beginner to Intermediate",
    highlights: [
      "Design thinking methodology",
      "User research techniques",
      "Interactive prototyping",
      "Portfolio development"
    ]
  },
  {
    title: "MHT - CET",
    description:
      "Transform your design skills with our comprehensive UI/UX masterclass. Learn the principles of user-centered design, prototyping, and modern design tools. Create stunning interfaces that users love.",
    duration: "10 weeks",
    students: "150+",
    level: "Beginner to Intermediate",
    highlights: [
      "Design thinking methodology",
      "User research techniques",
      "Interactive prototyping",
      "Portfolio development"
    ]
  },
  {
    title: "NDA",
    description:
      "Transform your design skills with our comprehensive UI/UX masterclass. Learn the principles of user-centered design, prototyping, and modern design tools. Create stunning interfaces that users love.",
    duration: "10 weeks",
    students: "150+",
    level: "Beginner to Intermediate",
    highlights: [
      "Design thinking methodology",
      "User research techniques",
      "Interactive prototyping",
      "Portfolio development"
    ]
  },
  {
    title: "NTSE",
    description:
      "Transform your design skills with our comprehensive UI/UX masterclass. Learn the principles of user-centered design, prototyping, and modern design tools. Create stunning interfaces that users love.",
    duration: "10 weeks",
    students: "150+",
    level: "Beginner to Intermediate",
    highlights: [
      "Design thinking methodology",
      "User research techniques",
      "Interactive prototyping",
      "Portfolio development"
    ]
  },
  {
    title: "IISER",
    description:
      "Transform your design skills with our comprehensive UI/UX masterclass. Learn the principles of user-centered design, prototyping, and modern design tools. Create stunning interfaces that users love.",
    duration: "10 weeks",
    students: "150+",
    level: "Beginner to Intermediate",
    highlights: [
      "Design thinking methodology",
      "User research techniques",
      "Interactive prototyping",
      "Portfolio development"
    ]
  },
  {
    title: "CUET",
    description:
      "Transform your design skills with our comprehensive UI/UX masterclass. Learn the principles of user-centered design, prototyping, and modern design tools. Create stunning interfaces that users love.",
    duration: "10 weeks",
    students: "150+",
    level: "Beginner to Intermediate",
    highlights: [
      "Design thinking methodology",
      "User research techniques",
      "Interactive prototyping",
      "Portfolio development"
    ]
  },
]

const CourseSection = ({ course }) => {
  const navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className="w-full py-20 px-6 sm:px-6 lg:px-8 border-b border-gray-400 last:border-b-2 
    transform transition-all duration-500 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-[#8fb7f7] to-[#4e77bb] bg-clip-text text-transparent">
            {course.title}
          </h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 py-2 bg-[#6ba2fa] text-white rounded-lg hover:bg-[#4e77bb]
                       transform transition-all duration-300 hover:scale-105"
          >
            Learn More
            <ChevronDown
              className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
                }`}
            />
          </button>
        </div>

        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          {course.description}
        </p>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 overflow-hidden transition-all duration-500 ease-in-out
                     ${isExpanded
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
            }`}
        >
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-[#4e77bb]" />
            <div>
              <p className="font-semibold text-gray-900">Duration</p>
              <p className="text-gray-600">{course.duration}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-[#4e77bb]" />
            <div>
              <p className="font-semibold text-gray-900">Students Enrolled</p>
              <p className="text-gray-600">{course.students}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-[#4e77bb]" />
            <div>
              <p className="font-semibold text-gray-900">Level</p>
              <p className="text-gray-600">{course.level}</p>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#4e77bb]" />
              Course Highlights
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 p-5">
              {course.highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <span className="w-2 h-2 bg-[#4e77bb] rounded-full" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center">
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
    </div>
  )
}

const AllCourses = () => {
  const navigate = useNavigate()
  return (
    <><Navbar />
      <div className="min-h-screen bg-orange-50">
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Featured Courses
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our carefully curated selection of courses designed to help
              you master the skills you need for success in today's digital world.
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
  )
}

export default AllCourses;
