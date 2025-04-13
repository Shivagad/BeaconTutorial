import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MessageSquareQuote, Quote } from 'lucide-react';
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function App() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const testimonialsPerPage = 8;

  useEffect(() => {
    axios.get('http://localhost:4000/server/testimonial/sorted')
      .then((response) => {
        setTestimonials(Array.isArray(response.data.data) ? response.data.data : []);
        // console.log(response);
      })
      .catch((error) => console.error('Error fetching testimonials:', error))
      .finally(() => setLoading(false));
  }, []);

  const indexOfLastTestimonial = currentPage * testimonialsPerPage;
  const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
  const currentTestimonials = testimonials.slice(indexOfFirstTestimonial, indexOfLastTestimonial);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setTimeout(() => {
      window.scrollTo(0, 300);
    }, 100);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
    setTimeout(() => {
      window.scrollTo(0, 300);
    }, 100);
  };

  const toggleDescription = (index) => {
    setTestimonials((prevTestimonials) =>
      prevTestimonials.map((testimonial, i) =>
        i === index
          ? { ...testimonial, isExpanded: !testimonial.isExpanded }
          : testimonial
      )
    );
  };

  const truncateDescription = (description) => {
    if (description.length > 100) {
      return description.slice(0, 100) + '...';
    }
    return description;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-[#73a6fa]">
      <div className="bg-[#4E77BB] pt-12 pb-20 relative shadow-md">
          <div className="max-w-4xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
              <MessageSquareQuote className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
             What Our Students Say
            </h1>
            <p className="text-white text-center max-w-2xl mx-auto">
            At our coaching institute, we empower students to excel in JEE, NEET, CET, and board exams (10th/12th). Our expert faculty, personalized coaching, and proven study materials help students unlock their full potential and achieve success in these highly competitive exams. Discover why thousands of students trust us for their academic journey and experience the difference in results and confidence.
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
        <div className="container mx-auto px-4 py-8 -mb-12">
         
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array(testimonialsPerPage).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8">
                  {/* Skeleton for video or image placeholder */}
                  <Skeleton height={200} />
                  {/* Skeleton for name and tag */}
                  <Skeleton height={30} width="60%" style={{ marginTop: '10px' }} />
                  <Skeleton height={20} width="40%" style={{ marginTop: '5px' }} />
                  {/* Skeleton for description text */}
                  <Skeleton count={3} style={{ marginTop: '10px' }} />
                  {/* Skeleton for the "Read More" button */}
                  <Skeleton height={30} width="30%" style={{ marginTop: '10px' }} />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {currentTestimonials.length > 0 ? (
                currentTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8 relative overflow-hidden"
                  >
                    {testimonial.youtubeVideoLink && (
                      <div className="mb-4">
                        <iframe
                          width="100%"
                          height="200"
                          src={`https://www.youtube.com/embed/${testimonial.youtubeVideoLink.split('v=')[1]}`}
                          title="YouTube video"
                          frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                    <Quote className="absolute top-4 right-4 text-blue-100 w-8 h-8" />
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800 text-center">{testimonial.name}</h3>
                          <p className="font-bold text-black text-sm text-center">{testimonial.tag}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {testimonial.isExpanded ? testimonial.description : truncateDescription(testimonial.description)}
                      </p>
                      {testimonial.description.length > 200 && (
                        <button
                          className="text-[#4e77bb] hover:text-blue-700"
                          onClick={() => toggleDescription(index)}
                        >
                          {testimonial.isExpanded ? 'Read Less' : 'Read More'}
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-600">No testimonials available.</p>
              )}
            </div>
          )}

          {/* Pagination Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#4e77bb] text-white rounded-md disabled:bg-gray-400"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={indexOfLastTestimonial >= testimonials.length}
              className="px-4 py-2 bg-[#4e77bb] text-white rounded-md disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
