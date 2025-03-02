import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Star, Clock, User } from "lucide-react"

const formatDate = timestamp => {
  const date = new Date(timestamp)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

const StarRating = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ))}
  </div>
)

const BlogCard = ({ blog }) => {
  // Limit content to 120 characters for preview
  const previewContent =
    blog.content.length > 120
      ? blog.content.substring(0, 120) + "..."
      : blog.content

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="group relative overflow-hidden rounded-2xl shadow-xl bg-white"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[#4E77BB] rounded-tl-lg transform -translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 z-10"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-indigo-500/30 rounded-br-lg transform translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 z-10"></div>

      {/* Card content */}
      <div className="md:flex h-full">
        {/* Image container with overlay */}
        <div className="md:w-2/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#4E77BB] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          <img
            src={blog.imagePath[0]}
            alt={blog.title}
            className="w-full h-64 md:h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Content container */}
        <div className="md:w-3/5 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#4E77BB] transition-colors duration-300">
              {blog.title}
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              {previewContent}
            </p>
          </div>

          {/* Author and date info */}
          <div className="mt-auto">
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-[#4E77BB] flex items-center justify-center text-white">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {blog.author}
                  </p>
                </div>
              </div>

              <div className="flex items-center text-gray-500 text-sm">
                <Clock size={14} className="mr-1" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
            </div>

            {/* Read more button */}
            <Link
              to={`/student-corner/${blog._id}`}
              className="mt-5 inline-flex items-center justify-center w-full py-3 px-4 bg-[#E85900] text-white font-medium rounded-lg shadow-lg transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl"
            >
              Read Full Article
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BlogCard
