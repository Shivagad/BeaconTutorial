import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/20/solid';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const StarRating = ({ blogId, currentRating }) => {
    const [rating, setRating] = useState(currentRating);
    const [hover, setHover] = useState(null);
    console.log(blogId);
    const handleRating = async (newRating) => {
      setRating(newRating);
      console.log(newRating);
    
      try {
        await axios.put(`https://beacon-tutorial.vercel.app/server/blog/update-rating/${blogId}`, {
          rating: newRating,
        });
      } catch (error) {
        console.error('Error updating rating:', error);
      }
    };
  
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <StarIcon
              key={starValue}
              className={`h-5 w-5 cursor-pointer ${
                (hover || rating) >= starValue ? 'text-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => handleRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(null)}
            />
          );
        })}
      </div>
    );
  };
  

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

const BlogPost = ({ blog }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const shortDescription = blog.content.slice(0, 150) + "...";
  
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
              src={blog.imagepath}
              alt={blog.title}
              className="w-full h-64 md:h-full object-cover transform hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-3xl font-bold text-gray-800">{blog.title}</h2>
              <StarRating blogId={blog?._id} currentRating={blog?.rating} />
            </div>
  
            <motion.div
              initial={false}
              animate={{ height: isExpanded ? "auto" : "100px" }}
              className="overflow-hidden"
            >
              <p className="text-gray-600 leading-relaxed">
                {isExpanded ? blog.content : shortDescription}
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
                  <p className="text-sm text-gray-500">{formatDate(blog.date)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };
  

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://beacon-tutorial.vercel.app/server/blog/getall');
        // Format the date from createdAt field (adjust if your field is different)
        const formattedBlogs = response.data.map(blog => ({
          ...blog,
          date: formatDate(blog.createdAt)
        }));
        setBlogs(formattedBlogs);
      } catch (err) {
        setError('Failed to fetch blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(blogs.length / postsPerPage);
  const getCurrentPosts = () => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return blogs.slice(indexOfFirstPost, indexOfLastPost);
  };

  return (
    <>

      <div className="min-h-screen -mb-12 bg-gradient-to-br from-[#7ea0d9] to-[#4e77bb] sm:px-6 px-5 py-10 lg:px-8">
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-white">Welcome to Our Blog</h2>
            <p className="text-lg text-gray-200 mt-2">
              Stay updated with the latest trends and insights in Beacon Tutorials.
            </p>
            <div className="w-24 border-b-4 border-white mx-auto mt-3"></div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-center mb-14 text-transparent bg-clip-text bg-gradient-to-r from-[#f29e6b] to-[#E85900]"
          >
            Latest Blog Posts
          </motion.h1>

          {loading ? (
            <div className="space-y-8">
              {Array(postsPerPage).fill(0).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-lg mb-1 transform"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 relative overflow-hidden">
                      <Skeleton height={260} />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <Skeleton height={40} width="80%" />
                      <Skeleton height={20} width="60%" className="mt-2" />
                      <Skeleton count={3} className="mt-4" />
                      <Skeleton height={30} width="30%" className="mt-4" />
                      <Skeleton height={20} width="40%" className="mt-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="space-y-8">
              {getCurrentPosts().map((blog) => (
                <BlogPost key={blog.id} blog={blog} />
              ))}
            </div>
          )}

          {totalPages > 1 && !loading && (
            <div className="mt-12 flex justify-center space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    currentPage === index + 1
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
    </>
  );
};

export default Blog;
