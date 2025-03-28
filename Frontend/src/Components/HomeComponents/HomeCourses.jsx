import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  GraduationCap,
  Book,
  TestTube2,
  Calculator,
  Brain,
  Microscope,
  Sparkles
} from "lucide-react"
import ssc from "../../../public/images/ssc.jpg"
import cbse from "../../../public/images/cbse.jpg"
import icse from "../../../public/images/icse.jpg"
import hsc from "../../../public/images/hsc.jpg"

const HomeCourses = () => {
  const [activeTab, setActiveTab] = useState("10th")
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate()

  const handleInquireNowClick = () => {
    navigate("/inquiry")  // Navigate to /inquire
  }

  const courses = {
    "10th": [
      {
        value:250,
        title: "SSC",
        description:
          "The aim of the course is to help students develop a strong foundation, so that they are well-prepared for the SSC Board exam",
        icon: <GraduationCap className="w-8 h-8 text-indigo-500" />,
        image: ssc,
         slug: '/all-courses'
      },
      {
        value:500,
        title: "CBSE",
        description:
          "We provide students with a strong foundation in these subjects and help them develop critical thinking and problem-solving skills.",
        icon: <Brain className="w-8 h-8 text-purple-500" />,
        image: cbse,
         slug: '/all-courses'
      },
      {
        value:890,
        title: "ICSE",
        description:
          "The ICSE Board course is designed for students who are preparing to take the Indian Certificate of Secondary Education (ICSE) examination.",
        icon: <Brain className="w-8 h-8 text-purple-500" />,
        image: icse,
         slug: '/all-courses'
      }
    ],
    "8th": [
      {
        value:250,
        title: "8th, 9th, 10th Foundation",
        description:
          "The aim of the course is to help students develop a strong foundation, so that they are well-prepared for the SSC Board exam",
        icon: <GraduationCap className="w-8 h-8 text-indigo-500" />,
        image: ssc,
         slug: '/all-courses'
      },
      {
        value:500,
        title: "8th, 9th, 10th Regular Board Batches",
        description:
          "We provide students with a strong foundation in these subjects and help them develop critical thinking and problem-solving skills.",
        icon: <Brain className="w-8 h-8 text-purple-500" />,
        image: cbse,
         slug: '/all-courses'
      }
    ],
    "11th": [
      {
        value:250,
        title: "11th + 12th Board Classes",
        description:
          "The aim of the course is to help students develop a strong foundation, so that they are well-prepared for the SSC Board exam",
        icon: <GraduationCap className="w-8 h-8 text-indigo-500" />,
        image: ssc,
         slug: '/all-courses'
      },
      {
        value:500,
        title: "11th + 12th JEE Mains + Advance",
        description:
          "We provide students with a strong foundation in these subjects and help them develop critical thinking and problem-solving skills.",
        icon: <Brain className="w-8 h-8 text-purple-500" />,
        image: cbse,
         slug: '/all-courses'
      },
      {
        value:500,
        title: "11th + 12th NEET",
        description:
          "We provide students with a strong foundation in these subjects and help them develop critical thinking and problem-solving skills.",
        icon: <Brain className="w-8 h-8 text-purple-500" />,
        image: cbse,
         slug: '/all-courses'
      },
      {
        value:500,
        title: "11th + 12th IISER",
        description:
          "We provide students with a strong foundation in these subjects and help them develop critical thinking and problem-solving skills.",
        icon: <Brain className="w-8 h-8 text-purple-500" />,
        image: cbse,
         slug: '/all-courses'
      },
      {
        value:500,
        title: "11th + 12th MHTCET",
        description:
          "We provide students with a strong foundation in these subjects and help them develop critical thinking and problem-solving skills.",
        icon: <Brain className="w-8 h-8 text-purple-500" />,
        image: cbse,
         slug: '/all-courses'
      },
      {
        value:500,
        title: "11th + 12th NDA",
        description:
          "We provide students with a strong foundation in these subjects and help them develop critical thinking and problem-solving skills.",
        icon: <Brain className="w-8 h-8 text-purple-500" />,
        image: cbse,
         slug: '/all-courses'
      },
      {
        value:500,
        title: "11th + 12th CUET",
        description:
          "We provide students with a strong foundation in these subjects and help them develop critical thinking and problem-solving skills.",
        icon: <Brain className="w-8 h-8 text-purple-500" />,
        image: cbse,
         slug: '/all-courses'
      }
    ],
    "12th": [
      {
        value:1100,
        title: "HSC Board",
        description:
          "We cover subjects such as Mathematics, Science, Commerce, Arts, and Languages, aiming to provide students with a deeper understanding of each subject and prepare them for the HSC exam",
        icon: <Calculator className="w-8 h-8 text-blue-500" />,
        image: hsc,
        slug: '/all-courses'
      }
    ],
    "nda": [
      {
        value:1250,
        title: "National Defence Academy",
        description:
          "Our NDA course aims to provide students with a strong foundation in the core subjects and skills necessary to succeed in the NDA entrance exam and their future careers in the Indian armed forces.",
        icon: <Calculator className="w-8 h-8 text-blue-500" />,
        image: hsc,
         slug: '/all-courses'
      },
      {
        value:1500,
        title: "NTSE",
        description:
          "We provide students with a strong foundation in the core subjects and skills necessary to succeed in the National Talent Search Examination and their future careers in science and social science fields.",
        icon: <Calculator className="w-8 h-8 text-blue-500" />,
        image: hsc,
         slug: '/all-courses'
      }
    ],
    "iitjee": [
      {
        value:1750,
        title: "JEE - MAINS",
        description:
          "Our JEE Mains course aims to provide students with a strong foundation in the core subjects and skills necessary to succeed in the exam and in their future academic and professional endeavors.",
        icon: <Calculator className="w-8 h-8 text-blue-500" />,
        image: hsc,
         slug: '/all-courses'
      },
      {
        value:2000,
        title: "JEE - ADVANCE",
        description:
          "This course builds on the foundational knowledge and skills covered in the JEE Mains course and focuses on developing more advanced analytical and subjective problem-solving abilities.",
        icon: <Calculator className="w-8 h-8 text-blue-500" />,
        image: hsc,
         slug: '/all-courses'
      },
      {
        value:2000,
        title: "JEE (Mains + Advance)",
        description:
          "This course builds on the foundational knowledge and skills covered in the JEE Mains course and focuses on developing more advanced analytical and subjective problem-solving abilities.",
        icon: <Calculator className="w-8 h-8 text-blue-500" />,
        image: hsc,
         slug: '/all-courses'
      },
    ],
    "neet": [
      {
        value:2250,
        title: "NEET - MEDICAL",
        description:
          "Our experienced teachers provide engaging and effective teaching methods to help students develop a strong foundation in the core subjects such as Physics, Chemistry, and Biology.",
        icon: <Calculator className="w-8 h-8 text-blue-500" />,
        image: hsc,
         slug: '/all-courses'
      },
      {
        value:2500,
        title: "FOUNDATION",
        description:
          "Our Foundation course for NEET and JEE is designed to help students build a firm foundation in the core subjects of Mathematics, Physics, Chemistry, and Biology.",
        icon: <Calculator className="w-8 h-8 text-blue-500" />,
        image: hsc,
         slug: '/all-courses'
      },
      {
        value:2500,
        title: "NEET Repeaters",
        description:
          "Our Foundation course for NEET and JEE is designed to help students build a firm foundation in the core subjects of Mathematics, Physics, Chemistry, and Biology.",
        icon: <Calculator className="w-8 h-8 text-blue-500" />,
        image: hsc,
         slug: '/all-courses'
      }
    ],
    "mhtcet": [
      {
        value:2750,
        title: "MHT - CET",
        description:
          "Our experienced teachers cover all important topics and concepts in the MH-CET syllabus through in-depth coaching. We use various effective teaching methods and resources, and provide well-structured study materials, mock tests, and regular assessments to track students' progress and identify areas for improvement.",
        icon: <Calculator className="w-8 h-8 text-blue-500" />,
        image: hsc,
         slug: '/all-courses'
      }
    ],
    "iiser": [
      {
        value:2750,
        title: "IISER",
        description:
          "Our experienced teachers cover all important topics and concepts in the MH-CET syllabus through in-depth coaching. We use various effective teaching methods and resources, and provide well-structured study materials, mock tests, and regular assessments to track students' progress and identify areas for improvement.",
        icon: <Calculator className="w-8 h-8 text-blue-500" />,
        image: hsc,
         slug: '/all-courses'
      }
    ],
    "cuet": [
      {
        value:2750,
        title: "CUET",
        description:
          "Our experienced teachers cover all important topics and concepts in the MH-CET syllabus through in-depth coaching. We use various effective teaching methods and resources, and provide well-structured study materials, mock tests, and regular assessments to track students' progress and identify areas for improvement.",
        icon: <Calculator className="w-8 h-8 text-blue-500" />,
        image: hsc,
         slug: '/all-courses'
      }
    ]
  }

  const tabs = [
    { id: "8th", label: "8th,9th,10th", icon: <Book className="w-4 h-4" /> },
    { id: "10th", label: "10th Boards", icon: <Book className="w-4 h-4" /> },
    { id: "11th", label: "11th + 12th", icon: <Book className="w-4 h-4" /> },
    { id: "12th", label: "12th Boards", icon: <GraduationCap className="w-4 h-4" /> },
    { id: "nda", label: "NDA/NTSE", icon: <Brain className="w-4 h-4" /> },
    { id: "iiser", label: "IISER", icon: <Brain className="w-4 h-4" /> },
    { id: "cuet", label: "CUET", icon: <Brain className="w-4 h-4" /> },
    { id: "iitjee", label: "IIT-JEE", icon: <Calculator className="w-4 h-4" /> },
    { id: "neet", label: "NEET", icon: <TestTube2 className="w-4 h-4" /> },
    { id: "mhtcet", label: "MHT-CET", icon: <Microscope className="w-4 h-4" /> }
  ]

  const courseCount = courses[activeTab]?.length || 0
  const isSingleCard = courseCount === 1
  const isTwoCards = courseCount === 2
  const isFewCards = isSingleCard || isTwoCards

  // Use a fixed card width (w-80) for few cards.
  // For three or more cards, each card will still be w-80, and the grid container is limited.
  const cardWidthClass = "w-80"

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4e77bb] to-[#518ced] p-6 relative  overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-mesh opacity-20"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center animate-float">
          <h2 className="text-5xl font-bold text-white mt-5 mb-4 relative inline-block">
            <span className="relative z-10">Courses we Offer</span>
            <Sparkles className="absolute -right-8 -top-2 w-6 h-6 text-yellow-300 animate-pulse" />
          </h2>
          <p className="text-xl text-white mb-4">
            Empowering minds with quality education focused on creating ingenious futures
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-8 py-4 rounded-xl transition-all duration-500
                backdrop-blur-md transform hover:scale-105 hover:-translate-y-1
                ${activeTab === tab.id
                  ? "bg-white/20 text-white shadow-lg border border-white/30"
                  : "bg-white/10 text-indigo-200 hover:bg-white/15 border border-white/10"
                }
              `}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Course Cards */}
        {isFewCards ? (
          // For one or two cards, use a flex container that shrinks to the width of its children.
          <div className="flex justify-center gap-8 flex-wrap">
            {courses[activeTab]?.map(course => (
              <div
                key={course.title}
                className="group relative animate-rotate3d"
                onMouseEnter={() => setHoveredCard(course.title)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl animate-morph"></div> */}
                <div
                  className={`relative ${cardWidthClass} backdrop-blur-lg rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 border border-white/20 bg-white/10`}
                >
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="relative p-8">
                    <h3 className="text-2xl font-bold text-white mb-3">{course.title}</h3>
                    <p className="text-indigo-200 mb-6">{course.description}</p>
                    <div className="relative overflow-hidden rounded-xl mb-6 transform transition-transform duration-500 group-hover:scale-105">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <button
                        onClick={() => {
                          navigate("/inquiry");
                          window.scrollTo(0,0); // Scroll to the top of the page
                        }}
                        className="w-full bg-[#E85900] text-white py-4 px-8 rounded-xl font-semibold transform transition-all duration-500 hover:scale-105 group relative overflow-hidden"
                      >
                      <span className="relative z-10">Inquire Now</span>
                      <div className="absolute inset-0 animate-shine"></div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // For three or more cards, wrap the grid in a max-width container and center the grid items.
          <div className="mx-auto max-w-[1024px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
              {courses[activeTab]?.map(course => (
                <div
                  key={course.title}
                  className="group relative animate-rotate3d"
                  onMouseEnter={() => setHoveredCard(course.title)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* <div className="absolute inset-0 bg-gradient-to-r from-[#E85900] to-[#4e77bb] rounded-2xl animate-morph"></div> */}
                  <div
                    className={`relative ${cardWidthClass} backdrop-blur-lg rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 border border-white/20 bg-white/10`}
                  >
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                    <div className="relative p-8">
                      <h3 className="text-2xl font-bold text-white mb-3">{course.title}</h3>
                      <p className="text-white mb-6">{course.description}</p>
                      <div className="relative overflow-hidden rounded-xl mb-6 transform transition-transform duration-500 group-hover:scale-105">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      <button
                        onClick={() => {
                          navigate("/inquiry");
                          window.scrollTo(0,0); // Scroll to the top of the page
                        }}
                        className="w-full bg-[#E85900] text-white py-4 px-8 rounded-xl font-semibold transform transition-all duration-500 hover:scale-105 group relative overflow-hidden"
                      >
                        <span className="relative z-10">Inquire Now</span>
                        <div className="absolute inset-0 animate-shine"></div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomeCourses
