import React, { useState, useEffect } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import BlogCard from "../Components/BlogComponent/BlogCard"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import blog from '../../public/images/blogs.png'
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
    <><Navbar />
      <div className="min-h-screen">
        <div className="bg-[#4E77BB] pt-12 pb-24 relative shadow-md">
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="flex justify-center mb-3">
              <img
                src={blog}
                className="h-20 w-20 filter invert brightness-0 contrast-200"
              ></img>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Our Blogs
            </h1>
            <p className="text-white text-center max-w-2xl mx-auto">
              Discover insights, tips, and the latest trends in education from our
              expert tutors and educators.
            </p>
          </div>
          {/* Wave SVG */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 100" className="w-full h-auto">
              <path
                fill="#fff"
                fillOpacity="1"
                d="M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,58.7C1120,53,1280,43,1360,37.3L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="max-w-6xl py-16 px-4 sm:px-6 lg:px-8">
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
                    className={`relative overflow-hidden px-5 py-2.5 rounded-full transition-all duration-300 ${currentPage === index + 1
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
      <Footer />
    </>
  )
}

export default Blog
