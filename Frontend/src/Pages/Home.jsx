import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Trophy,
  Users,
  BrainCircuit,
  BookOpen,
  Award,
  Calculator,
  UsersRound,
  Clock,
  X,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import Footer from "../Components/Footer";
import HomeCourses from "../Components/HomeComponents/HomeCourses";
import HomeWhyChooseUse from "../Components/HomeComponents/HomeWhyChooseUs";
import TestimonialSection from "../Components/HomeComponents/TestiMonialSection";
import ClassGallery from "../Components/HomeComponents/ClassGallery";
import { useNavigate } from "react-router-dom";
import BranchCards from "../Components/HomeComponents/BranchCards";

function Home() {
  const navigate = useNavigate();
  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const response = await axios.get(
          "https://beacon-tutorial.vercel.app/server/poster/getallposter"
        );
        setPosters(response.data.data || []);
      } catch (error) {
        console.error("Error fetching posters:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosters();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsPopupOpen(true);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % posters.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + posters.length) % posters.length);
  };

  useEffect(() => {
    if (posters.length > 0) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [posters.length]);

  const placeholderPosters = [
    { desktop: "/images/aboutus_img1.avif", mobile: "/images/cbse.jpg" },
  ];

  return (
    <>
      <Navbar />

      {/* Inquiry Popup (Appears Once per Tab Session) */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
          <div className="bg-white border-4 border-[#4E77BB] rounded-lg shadow-lg p-6 w-96 relative text-center">
            {/* Close Icon (Upper Right Corner) */}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold text-[#4E77BB] mb-2">
              Inquiry & Branch Information
            </h2>
            <p className="text-gray-700">
              Contact us for inquiries or visit our branches.
            </p>

            {/* Branch List */}
            <ul className="mt-4 text-gray-600">
              <li>
                📍 <strong>Beacon Mohan Nagar</strong>
              </li>
              <li>
                📧{" "}
                <a
                  href="mailto:beacontutorials7@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  beacontutorials7@gmail.com
                </a>
              </li>
              <li>
                📞{" "}
                <a
                  href="tel:+918446222268"
                  className="text-blue-600 hover:underline"
                >
                  +91 8446222268
                </a>
              </li>

              <li className="mt-4">
                📍 <strong>Beacon Suncity Ambegaon</strong>{" "}
              </li>
              <li>
                📧{" "}
                <a
                  href="mailto:beacontutorials02.suncity@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  beacontutorials02.suncity@gmail.com
                </a>
              </li>
              <li>
                📞{" "}
                <a
                  href="tel:+919527069991"
                  className="text-blue-600 hover:underline"
                >
                  +91 9527069991
                </a>
              </li>
            </ul>

            {/* Contact Page Link */}
            <p className="text-gray-700 mt-4">
              For More Information, Visit our{" "}
              <a href="/contact" className="text-blue-600 hover:underline">
                Contact Page
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Blur effect when popup is open */}
      <div
        className={`min-h-screen ${isPopupOpen ? "blur-sm" : ""
          } transition-all duration-300`}
      >
        {/* Page Content */}
        <div className="min-h-screen bg-gray-50">
          <div className="flex items-center justify-center bg-white px-4 py-1 rounded-t-lg shadow text-center gap-2">
            <p className="text-gray-900 font-medium text-sm">Beacon Results Out!</p>
            <a href="/all-results" className="text-blue-600 font-medium text-sm flex items-center">
              View Results →
            </a>
          </div>



          <div className="relative w-full aspect-square md:aspect-auto md:min-h-[50vh] flex items-center justify-center mb-6">
            {posters.length > 0 ? (
              posters.map((poster, index) => (
                <div
                  key={`poster-${index}`}
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <picture className="w-full h-full">
                    {/* Mobile Image */}
                    <source
                      media="(max-width: 768px)"
                      srcSet={`${poster.mobileImagePath}?f_auto,q_auto,w_600,h_600,c_fill`}
                    />
                    {/* Default (Desktop) Image */}
                    <img
                      src={`${poster.imagePath}?f_auto,q_auto,w_1200,h_800,c_fill`}
                      alt={`Poster ${index + 1}`}
                      role="presentation"
                      className="w-full h-full object-contain md:object-fill"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="high"
                    />
                  </picture>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                {placeholderPosters.length > 0 ? (
                  <picture>
                    <source
                      srcSet={placeholderPosters[0].mobile}
                      media="(max-width: 768px)"
                    />
                    <img
                      src={placeholderPosters[0].desktop}
                      alt="Poster"
                      className="w-full h-[350px] object-cover"
                    />
                  </picture>
                ) : (
                  <p className="text-gray-500">No posters available</p>
                )}
              </div>
            )}

            {/* Carousel Buttons */}
            {posters.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          <div>
            <BranchCards />
          </div>

          <div className="max-w-7xl mx-auto -mt-3">
            {/* Card Container */}
            <div className="justify-center place-items-center bg-white rounded-xl shadow-md p-6 md:p-10">
              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-bold text-center text-[#4E77BB] mb-2">
                15+ Years of Legacy
              </h2>
              <p className="text-center text-gray-600 text-lg md:text-xl mb-8">
                with excellent Results
              </p>

              {/* Subtext */}
              <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed">
                Be the next stellar of Beacon Tutorial. Accomplish greatness and
                be a part of our legacy. Find your course now.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center place-items-center">
                {/* Stat 2 */}
                <div className="flex flex-col items-center">
                  <Award className="w-10 h-10 text-[#4E77BB] mb-2" />
                  <p className="text-xl font-bold text-gray-800">131,700+</p>
                  <p className="text-gray-600">
                    Beaconian qualified NEET &amp; JEE in 2024
                  </p>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col items-center">
                  <UsersRound className="w-10 h-10 text-[#4E77BB] mb-2" />
                  <p className="text-xl font-bold text-gray-800">500+</p>
                  <p className="text-gray-600">Expert Faculty</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mt-20 overflow-hidden leading-[0]">
            <svg
              id="wave"
              style={{ transform: "rotate(0deg)", transition: "0.3s" }}
              viewBox="0 0 1440 120"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                  <stop stop-color="#4E77BB" offset="0%"></stop>
                  <stop stop-color="" offset="100%"></stop>
                </linearGradient>
              </defs>
              <path
                style={{ transform: "translate(0, 0px)", opacity: "1" }}
                fill="url(#sw-gradient-0)"
                d="M0,36L60,40C120,44,240,52,360,62C480,72,600,84,720,74C840,64,960,32,1080,18C1200,4,1320,8,1440,12C1560,16,1680,20,1800,24C1920,28,2040,32,2160,44C2280,56,2400,76,2520,78C2640,80,2760,64,2880,56C3000,48,3120,48,3240,58C3360,68,3480,88,3600,90C3720,92,3840,76,3960,74C4080,72,4200,84,4320,78C4440,72,4560,48,4680,34C4800,20,4920,16,5040,24C5160,32,5280,52,5400,54C5520,56,5640,40,5760,40C5880,40,6000,56,6120,70C6240,84,6360,96,6480,88C6600,80,6720,52,6840,44C6960,36,7080,48,7200,60C7320,72,7440,84,7560,78C7680,72,7800,48,7920,46C8040,44,8160,64,8280,64C8400,64,8520,44,8580,34L8640,24L8640,120L8580,120C8520,120,8400,120,8280,120C8160,120,8040,120,7920,120C7800,120,7680,120,7560,120C7440,120,7320,120,7200,120C7080,120,6960,120,6840,120C6720,120,6600,120,6480,120C6360,120,6240,120,6120,120C6000,120,5880,120,5760,120C5640,120,5520,120,5400,120C5280,120,5160,120,5040,120C4920,120,4800,120,4680,120C4560,120,4440,120,4320,120C4200,120,4080,120,3960,120C3840,120,3720,120,3600,120C3480,120,3360,120,3240,120C3120,120,3000,120,2880,120C2760,120,2640,120,2520,120C2400,120,2280,120,2160,120C2040,120,1920,120,1800,120C1680,120,1560,120,1440,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
              ></path>
            </svg>
          </div>
          <div className="relative bg-[#4E77BB] text-white overflow-hidden">
            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center space-y-4 md:space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-center">
                BEST - Talent Test
              </h1>
              <p className="text-center text-lg md:text-xl max-w-xl">
                Up to 99% Scholarship for qualifying students from 10th SSC /
                CBSE / ICSE
              </p>
              <button
                onClick={() => {
                  navigate("/scholarship");
                  window.scrollTo(0, 0);
                }}
                className="bg-orange-400 hover:bg-orange-500 px-6 py-2 
                     rounded-full text-white text-lg font-semibold 
                     transform hover:-translate-y-1 hover:scale-105 
                     transition duration-300"
              >
                Register Now for Free
              </button>
            </div>
          </div>
          <div className="w-full overflow-hidden leading-[0]">
            <svg
              id="wave"
              style={{ transform: "rotate(180deg)", transition: "0.3s" }}
              viewBox="0 0 1440 120"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="myGradient" x1="0" x2="0" y1="1" y2="0">
                  <stop stop-color="#4E77BB" offset="0%"></stop>
                  <stop stop-color="#123456" offset="100%"></stop>
                </linearGradient>
              </defs>

              <path
                style={{ transform: "translate(0, 0px)", opacity: "1" }}
                fill="url(#sw-gradient-0)"
                d="M0,36L60,40C120,44,240,52,360,62C480,72,600,84,720,74C840,64,960,32,1080,18C1200,4,1320,8,1440,12C1560,16,1680,20,1800,24C1920,28,2040,32,2160,44C2280,56,2400,76,2520,78C2640,80,2760,64,2880,56C3000,48,3120,48,3240,58C3360,68,3480,88,3600,90C3720,92,3840,76,3960,74C4080,72,4200,84,4320,78C4440,72,4560,48,4680,34C4800,20,4920,16,5040,24C5160,32,5280,52,5400,54C5520,56,5640,40,5760,40C5880,40,6000,56,6120,70C6240,84,6360,96,6480,88C6600,80,6720,52,6840,44C6960,36,7080,48,7200,60C7320,72,7440,84,7560,78C7680,72,7800,48,7920,46C8040,44,8160,64,8280,64C8400,64,8520,44,8580,34L8640,24L8640,120L8580,120C8520,120,8400,120,8280,120C8160,120,8040,120,7920,120C7800,120,7680,120,7560,120C7440,120,7320,120,7200,120C7080,120,6960,120,6840,120C6720,120,6600,120,6480,120C6360,120,6240,120,6120,120C6000,120,5880,120,5760,120C5640,120,5520,120,5400,120C5280,120,5160,120,5040,120C4920,120,4800,120,4680,120C4560,120,4440,120,4320,120C4200,120,4080,120,3960,120C3840,120,3720,120,3600,120C3480,120,3360,120,3240,120C3120,120,3000,120,2880,120C2760,120,2640,120,2520,120C2400,120,2280,120,2160,120C2040,120,1920,120,1800,120C1680,120,1560,120,1440,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
              ></path>
            </svg>
          </div>
          {/* container end */}

          <div className="relative bg-white">
            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left Side: Text */}
              <div className="space-y-4 md:pr-8 z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Beacon Tutorials
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  The name itself denotes the aim of its establishment, that is,
                  being a guiding signal that will bolster the enthusiastic
                  minds to their life goals. We started with humble beginnings
                  with a mission to revolutionize education and transform young
                  lives. With a small classroom in Pune and some students of
                  class 9th and 10th, Beacon Tutorials’ teachers made an impact
                  on the way teaching is done and results are achieved. The
                  students started recommending Us to everyone because they had
                  found the teaching innovative and result oriented.
                </p>
                <button
                  onClick={() => {
                    navigate("/about");
                    window.scrollTo(0, 0);
                  }}
                  className="bg-[#4E77BB] hover:bg-[#5786d9] text-white 
                       px-6 py-2 rounded-full transform transition 
                       hover:rotate-3 hover:scale-105"
                >
                  Know About Beacon
                </button>
              </div>

              {/* Right Side: Image with 3D Hover */}
              <div className="flex justify-center md:justify-end z-10">
                <div className="group perspective-1000">
                  <img
                    src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/k-26-aom-39376-lyj0598-1-training_1.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=b16d9308ed008e6ba28840eb5d616b29"
                    alt="Beacon Classes"
                    className="w-100 h-80 rounded-2xl shadow-lg transform transition duration-500 
                 group-hover:rotate-y-6 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <HomeCourses />
          </div>

          <div>
            <HomeWhyChooseUse />
          </div>

          <div>
            <TestimonialSection />
          </div>

          <div>
            <ClassGallery />
          </div>

          {/* CTA Section */}
          <div className="bg-white text-[#4e77bb] py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Start Your Journey Today
              </h2>
              <p className="mb-8 text-lg">
                Join thousands of successful students who achieved their dreams
                with us
              </p>
              <button
                onClick={() => {
                  navigate("/inquiry");
                  window.scrollTo(0, 0);
                }}
                className="bg-[#4e77bb] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#a6d8f7] hover:text-black transition-colors"
              >
                Enroll Now
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-[#4e77bb] -mb-14 text-white py-12">
            <div className="flex justify-center">
              <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { icon: Users, value: "50,000+", label: "Students" },
                  { icon: Trophy, value: "95%", label: "Success Rate" },
                  {
                    icon: GraduationCap,
                    value: "200+",
                    label: "Expert Faculty",
                  },
                  { icon: Award, value: "15+", label: "Years Experience" },
                ].map((stat, index) => (
                  <div key={index}>
                    <stat.icon className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      {/* end of blurr div */}
    </>
  );
}

export default Home;
