import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/20/solid';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const blogs = [
  {
    id: 1,
    title: "The Future of Web Development",
    description: "Exploring the latest trends in web development and what the future holds for developers. As we move into a new era of web development, we're seeing unprecedented changes in how we build and deploy applications. From serverless architectures to edge computing, the landscape is evolving rapidly. Developers are now embracing AI-powered tools, low-code platforms, and increasingly sophisticated frameworks that make development more efficient than ever before. The rise of WebAssembly is opening new possibilities for high-performance web applications, while Progressive Web Apps continue to blur the line between web and native experiences.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    author: "John Doe",
    rating: 5,
    date: "Oct 15, 2023"
  },
  {
    id: 2,
    title: "Mastering React Hooks",
    description: "A comprehensive guide to using React Hooks effectively in your applications. React Hooks have revolutionized how we write React components, enabling powerful state management and side effects in functional components. This guide deep dives into advanced hook patterns, custom hooks, and best practices for managing component lifecycle. We'll explore real-world examples of complex state management, performance optimization techniques, and common pitfalls to avoid. Understanding these concepts is crucial for building scalable and maintainable React applications.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    author: "Jane Smith",
    rating: 4,
    date: "Oct 14, 2023"
  },
  {
    id: 3,
    title: "CSS Tips and Tricks",
    description: "Learn advanced CSS techniques to create beautiful and responsive designs. Modern CSS has evolved into a powerful styling language with features that were once only possible through JavaScript. This guide covers advanced selectors, CSS Grid layouts, custom properties, animations, and modern CSS features like container queries and cascade layers. We'll also explore practical examples of responsive design patterns, dark mode implementation, and CSS architecture for large-scale applications.",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    author: "Mike Johnson",
    rating: 5,
    date: "Oct 13, 2023"
  }
];

function StarRating({ rating }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          className={`h-5 w-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
        />
      ))}
    </div>
  );
}

function BlogPost({ blog }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shortDescription = blog.description.slice(0, 150) + "...";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 rounded-xl overflow-hidden shadow-lg mb-1 transform"
    >
      <div className="md:flex">
        <div className="md:w-1/3 relative overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 md:h-full object-cover transform hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold text-gray-800">
              {blog.title}
            </h2>
            <StarRating rating={blog.rating} />
          </div>

          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : "100px" }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 leading-relaxed">
              {isExpanded ? blog.description : shortDescription}
            </p>
          </motion.div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300 flex items-center"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>

          <div className="mt-6 flex items-center justify-between border-t pt-4">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{blog.author}</p>
                <p className="text-sm text-gray-500">{blog.date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;
  const totalPages = Math.ceil(blogs.length / postsPerPage);

  const getCurrentPosts = () => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return blogs.slice(indexOfFirstPost, indexOfLastPost);
  };

  return (
    <><Navbar />
     <div className="min-h-screen -mb-12 bg-gradient-to-br from-[#7ea0d9] to-[#4e77bb] sm:px-6 px-5 py-10 lg:px-8">
        <div className="max-w-6xl mx-auto relative">
          {/* Introduction Section */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-white">Welcome to Our Blog</h2>
            <p className="text-lg text-gray-200 mt-2">Stay updated with the latest trends and insights in Beacon Tutorials.</p>
            <div className="w-24 border-b-4 border-white mx-auto mt-3"></div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-center mb-14 text-transparent bg-clip-text bg-gradient-to-r from-[#f29e6b] to-[#E85900]"
          >
            Latest Blog Posts
          </motion.h1>

          <div className="space-y-8">
            {getCurrentPosts().map((blog) => (
              <BlogPost key={blog.id} blog={blog} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${currentPage === index + 1
                    ? 'bg-gradient-to-r from-white to-gray-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                    }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Blog;