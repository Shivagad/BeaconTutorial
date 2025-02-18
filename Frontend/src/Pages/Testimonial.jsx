import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MessageSquareQuote, Quote } from 'lucide-react';
import Navbar from "../Components/Navbar"
import Footer from '../Components/Footer'

export default function App() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const testimonialsPerPage = 8;

  useEffect(() => {
    axios.get('http://localhost:4000/server/testimonial/sorted')
      .then((response) => {
        setTestimonials(Array.isArray(response.data.data) ? response.data.data : []);
        console.log(response);
      })
      .catch((error) => console.error('Error fetching testimonials:', error));
  }, []);

  const indexOfLastTestimonial = currentPage * testimonialsPerPage;
  const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
  const currentTestimonials = testimonials.slice(indexOfFirstTestimonial, indexOfLastTestimonial);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
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
  <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="flex justify-center mb-4">
            <MessageSquareQuote className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
  What Our Students Say
</h1>
<p className="text-xl text-gray-600 max-w-2xl mx-auto">
  At our coaching institute, we empower students to excel in JEE, NEET, CET, and board exams (10th/12th). Our expert faculty, personalized coaching, and proven study materials help students unlock their full potential and achieve success in these highly competitive exams. Discover why thousands of students trust us for their academic journey and experience the difference in results and confidence.
</p>
        </motion.div>
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
              className="text-blue-600 hover:text-blue-700"
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


        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={indexOfLastTestimonial >= testimonials.length}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
