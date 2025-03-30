import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Star,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Share2,
  Copy,
  Facebook,
  Twitter,
  MessageCircle,
} from "lucide-react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Popover } from "@headlessui/react";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

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
    <span className="ml-2 text-sm font-medium text-gray-700">
      {rating.toFixed(1)}
    </span>
  </div>
);

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [copied, setCopied] = useState(false);
  const shareLink = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [isBookmarked, setIsBookmarked] = useState(false);
  const handleBookmark = () => setIsBookmarked(!isBookmarked);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Try to fetch from API
        const response = await axios.get(
          `https://beacon-tutorial.vercel.app/server/blog/${id}`
        );
        // console.log(response.data.data);

        setBlog(response.data.data);
      } catch (err) {
        // console.log("Using mock data instead of API");
        // Fall back to mock data if API fails
        const mockBlog = MOCK_BLOGS.find((blog) => blog.id === id);
        if (mockBlog) {
          setBlog(mockBlog);
        } else {
          setError("Blog post not found");
        }
      } finally {
        setLoading(false);
      }
    };

    // Simulate network delay for loading state demonstration
    setTimeout(() => {
      fetchBlog();
    }, 1000);
  }, [id]);

  const nextImage = () => {
    if (blog?.imagePath) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === blog.imagePath.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (blog?.imagePath) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? blog.imagePath.length - 1 : prevIndex - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Skeleton height={50} width="80%" className="mb-4" />
          <Skeleton height={30} width="40%" className="mb-8" />
          <Skeleton height={400} className="mb-8" />
          <Skeleton height={20} count={10} className="mb-2" />
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-700 mb-6">
              {error || "Blog post not found"}
            </p>
            <Link
              to="/student-corner"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Blogs
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link
            to="/student-corner"
            className="inline-flex items-center mb-8 text-[#E85900]  transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to All Blogs
          </Link>

          {/* Article header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                {formatDate(blog.createdAt)}
              </div>

              <div className="flex items-center">
                <User size={16} className="mr-2" />
                {blog.author}
              </div>

              {blog.readTime && (
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  {blog.readTime}
                </div>
              )}

              {blog.category && (
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                  {blog.category}
                </span>
              )}

              {/* <div className="ml-auto">
              <StarRating rating={blog.rating} />
            </div> */}
            </div>
          </motion.div>

          {/* Additional images carousel */}
          {blog.imagePath && blog.imagePath.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-10 relative"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Gallery</h2>

              <div className="relative rounded-xl overflow-hidden shadow-lg h-80">
                <img
                  src={blog.imagePath[currentImageIndex]}
                  alt={`${blog.title} - image ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />

                {/* Navigation arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} className="text-gray-800" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} className="text-gray-800" />
                </button>

                {/* Image indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {blog.imagePath.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        currentImageIndex === index
                          ? "bg-white"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Article content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
         

          {/* Article footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-[#4E77BB] flex items-center justify-center text-white">
                  <User size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{blog.author}</p>
                </div>
              </div>

              <div className="flex space-x-4 mt-4 sm:mt-0">
                <Popover className="relative">
                  <Popover.Button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <Share2 size={20} className="text-gray-700" />
                  </Popover.Button>

                  <Popover.Panel className="absolute z-10 mt-2 -ml-16 w-40 bg-white border border-gray-200 rounded-lg shadow-lg p-2 space-y-2">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        shareLink
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 hover:bg-gray-100 p-1 rounded"
                    >
                      <Facebook size={18} />
                      <span>Facebook</span>
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        shareLink
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 hover:bg-gray-100 p-1 rounded"
                    >
                      <Twitter size={18} />
                      <span>Twitter</span>
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        shareLink
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 hover:bg-gray-100 p-1 rounded"
                    >
                      <MessageCircle size={18} />
                      <span>WhatsApp</span>
                    </a>
                    <button
                      onClick={handleCopy}
                      className="flex items-center space-x-2 hover:bg-gray-100 p-1 rounded w-full"
                    >
                      <Copy size={18} />
                      <span>{copied ? "Copied!" : "Copy Link"}</span>
                    </button>
                  </Popover.Panel>
                </Popover>

                <button
                  onClick={handleBookmark}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Bookmark
                    size={20}
                    className={
                      isBookmarked
                        ? "text-blue-700 fill-blue-700"
                        : "text-gray-700"
                    }
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetailPage;
