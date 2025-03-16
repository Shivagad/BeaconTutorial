import React, { useState, useEffect } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import BlogCard from "../Components/BlogComponent/BlogCard"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

// Mock data for development (remove when connecting to real API)
const MOCK_BLOGS = [
  {
    id: "1",
    title: "Mastering Advanced Mathematics: Tips and Tricks",
    content:
      "Mathematics is often considered one of the most challenging subjects for students. However, with the right approach and techniques, anyone can excel in this field. In this comprehensive guide, we explore advanced strategies for tackling complex mathematical problems, from calculus to linear algebra. Our expert tutors share their insights on developing mathematical intuition and problem-solving skills that will serve you well beyond the classroom.",
    author: "Dr. Sarah Johnson",
    imagepath:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    rating: 4.8,
    createdAt: "2023-11-15T10:30:00Z"
  },
  {
    id: "2",
    title: "The Science of Effective Study Techniques",
    content:
      "Studying effectively is not just about putting in hours; it's about optimizing how you learn and retain information. This article delves into evidence-based study techniques that have been proven to enhance learning outcomes. From spaced repetition to the Pomodoro technique, discover methods that can transform your academic performance and help you achieve your educational goals with less stress and more efficiency.",
    author: "Prof. Michael Chen",
    imagepath:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    rating: 4.5,
    createdAt: "2023-12-03T14:45:00Z"
  },
  {
    id: "3",
    title: "Preparing for College Admissions: A Complete Guide",
    content:
      "The college admissions process can be daunting, but with proper preparation, you can navigate it successfully. This comprehensive guide covers everything from standardized test preparation to crafting compelling personal statements. Learn how to showcase your strengths, select the right schools for your goals, and make your application stand out in a competitive landscape. Our admissions experts provide insider tips that could make the difference in your academic journey.",
    author: "Emma Rodriguez",
    imagepath:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    rating: 4.9,
    createdAt: "2024-01-20T09:15:00Z"
  },
  {
    id: "4",
    title: "The Future of Education: Technology and Beyond",
    content:
      "Education is evolving rapidly with technological advancements reshaping how we learn and teach. This forward-looking article examines emerging trends in educational technology, from AI-powered tutoring to virtual reality classrooms. Understand how these innovations are creating more personalized, accessible, and engaging learning experiences. We also explore the skills that will be most valuable in the future job market and how education systems are adapting to prepare students for tomorrow's challenges.",
    author: "Dr. James Wilson",
    imagepath:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    rating: 4.7,
    createdAt: "2024-02-08T16:20:00Z"
  },
  {
    id: "5",
    title: "Building Resilience in Students: Mental Health Strategies",
    content:
      "Academic success is closely tied to mental wellbeing. This important article addresses the growing concern of student mental health and provides practical strategies for building resilience. Learn techniques for managing academic stress, maintaining work-life balance, and developing a growth mindset. Our mental health professionals share insights on recognizing warning signs and accessing support resources. Discover how fostering emotional intelligence can lead to better academic outcomes and lifelong success.",
    author: "Dr. Lisa Patel",
    imagepath:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    rating: 5.0,
    createdAt: "2024-03-01T11:00:00Z"
  }
]

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 3

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Try to fetch from API
        const response = await axios.get(
          "http://localhost:4000/server/blog/getall"
        )
        setBlogs(response.data)
      } catch (err) {
        console.log("Using mock data instead of API")
        // Fall back to mock data if API fails
        setBlogs(MOCK_BLOGS)
      } finally {
        setLoading(false)
      }
    }

    // Simulate network delay for loading state demonstration
    setTimeout(() => {
      fetchBlogs()
    }, 1000)
  }, [])

  const totalPages = Math.ceil(blogs.length / postsPerPage)

  const getCurrentPosts = () => {
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    return blogs.slice(indexOfFirstPost, indexOfLastPost)
  }

  return (
    <><Navbar/>
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header section with animated elements */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl font-bold mb-4 bg-[#4E77BB] bg-clip-text text-transparent">
            Our Blog
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover insights, tips, and the latest trends in education from our
            expert tutors and educators.
          </p>

          <div className="w-24 h-1 bg-[#4E77BB] mx-auto mt-8"></div>
        </motion.div>

        {/* Blog posts grid */}
        {loading ? (
          <div className="space-y-10">
            {Array(postsPerPage)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="md:flex">
                    <div className="md:w-2/5">
                      <Skeleton height={300} />
                    </div>
                    <div className="md:w-3/5 p-6">
                      <Skeleton height={36} width="80%" />
                      <Skeleton height={20} count={3} className="mt-4" />
                      <Skeleton height={40} width="100%" className="mt-6" />
                      <div className="mt-6 pt-4">
                        <Skeleton height={24} width="60%" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-50 rounded-lg">
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {getCurrentPosts().map(blog => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <div className="mt-16 flex justify-center">
            <div className="inline-flex items-center rounded-full bg-white/80 backdrop-blur-sm p-1 shadow-lg">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`relative overflow-hidden px-5 py-2.5 rounded-full transition-all duration-300 ${
                    currentPage === index + 1
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                  {currentPage === index + 1 && (
                    <motion.div
                      layoutId="activePage"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Blog
