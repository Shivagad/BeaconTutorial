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

// Mock data for development (remove when connecting to real API)
const MOCK_BLOGS = [
  {
    id: "1",
    title: "Mastering Advanced Mathematics: Tips and Tricks",
    content: `Mathematics is often considered one of the most challenging subjects for students. However, with the right approach and techniques, anyone can excel in this field.

In this comprehensive guide, we explore advanced strategies for tackling complex mathematical problems, from calculus to linear algebra. Our expert tutors share their insights on developing mathematical intuition and problem-solving skills that will serve you well beyond the classroom.

## Key Strategies for Mathematical Success

1. **Build a Strong Foundation**: Make sure you thoroughly understand fundamental concepts before moving to advanced topics.

2. **Practice Regularly**: Mathematics requires consistent practice. Set aside time each day to work through problems.

3. **Understand, Don't Memorize**: Focus on understanding the underlying principles rather than memorizing formulas.

4. **Visualize Problems**: Try to create mental or physical representations of abstract concepts.

5. **Seek Multiple Approaches**: There's often more than one way to solve a problem. Exploring different methods deepens your understanding.

## Advanced Problem-Solving Techniques

When facing complex problems, break them down into smaller, manageable parts. Identify what you know and what you need to find. Look for patterns and connections to concepts you're already familiar with.

Remember that making mistakes is an essential part of the learning process. Analyze your errors to understand where your reasoning went wrong, and use that insight to improve your approach.

## The Role of Technology in Mathematics Learning

Modern technology offers powerful tools for mathematics education. From graphing calculators to specialized software like MATLAB and Mathematica, these resources can help visualize complex concepts and verify your solutions.

However, it's important to use technology as a supplement to, not a replacement for, understanding the underlying mathematics. Always strive to grasp the concepts before relying on technological aids.`,
    author: "Dr. Sarah Johnson",
    imagepath:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    rating: 4.8,
    createdAt: "2023-11-15T10:30:00Z",
    readTime: "8 min read",
    category: "Mathematics",
    additionalImages: [
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    ],
  },
  {
    id: "2",
    title: "The Science of Effective Study Techniques",
    content: `Studying effectively is not just about putting in hours; it's about optimizing how you learn and retain information. This article delves into evidence-based study techniques that have been proven to enhance learning outcomes.

From spaced repetition to the Pomodoro technique, discover methods that can transform your academic performance and help you achieve your educational goals with less stress and more efficiency.

## The Myth of Multitasking

Many students believe they can effectively study while checking social media, texting friends, or watching TV. However, research consistently shows that multitasking significantly reduces learning efficiency and retention. When you switch between tasks, your brain needs time to refocus, resulting in lost productivity and decreased comprehension.

Instead, try focused study sessions with minimal distractions. Put your phone in another room, use website blockers if necessary, and create a dedicated study environment.

## Spaced Repetition: The Memory Hack

One of the most powerful study techniques is spaced repetition, which involves reviewing material at increasing intervals. Rather than cramming all your study into one session, space it out over days or weeks.

For example, after learning new material, review it:
- The same day
- One day later
- Three days later
- One week later
- Two weeks later

This approach works with how your brain forms long-term memories and can dramatically improve retention compared to cramming.

## The Pomodoro Technique: Managing Focus

The Pomodoro Technique breaks study time into focused intervals (typically 25 minutes) followed by short breaks (5 minutes). After completing four "pomodoros," take a longer break of 15-30 minutes.

This method helps maintain concentration while preventing burnout. The time constraint also creates a sense of urgency that can boost productivity.

## Active Recall: Testing Yourself

Instead of passively rereading notes or textbooks, actively test your knowledge. Close your materials and try to explain concepts in your own words, solve problems without looking at examples, or create and answer your own questions.

Research shows that the effort of retrieving information strengthens memory much more effectively than simply reviewing it.`,
    author: "Prof. Michael Chen",
    imagepath:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    rating: 4.5,
    createdAt: "2023-12-03T14:45:00Z",
    readTime: "6 min read",
    category: "Study Skills",
    additionalImages: [
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    ],
  },
  // Additional mock blogs would be defined here
];

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
        console.log(response.data.data);

        setBlog(response.data.data);
      } catch (err) {
        console.log("Using mock data instead of API");
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

  // Function to convert markdown-like content to HTML
  const formatContent = (content) => {
    if (!content) return "";

    // Replace headers
    let formattedContent = content.replace(
      /## (.*?)$/gm,
      '<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-800">$1</h2>'
    );

    // Replace paragraphs (double newlines)
    formattedContent = formattedContent.replace(
      /\n\n(.*?)(?=\n\n|$)/gs,
      '<p class="mb-4 text-gray-700 leading-relaxed">$1</p>'
    );

    // Replace numbered lists
    formattedContent = formattedContent.replace(
      /(\d+)\. (.*?)(?=\n\d+\.|$)/gs,
      '<li class="ml-6 mb-2 list-decimal text-gray-700">$2</li>'
    );

    // Replace bold text
    formattedContent = formattedContent.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );

    return formattedContent;
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
                  className="w-full h-full object-cover"
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
            dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }}
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
