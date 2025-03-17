import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios"; // Added axios import
import { useNavigate } from "react-router-dom";
import person from '../../../public/images/person.png'
const TestimonialSection = () => {
    const navigate = useNavigate()
    const [activeIndex, setActiveIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [testi, setTesti] = useState([]); // Ensure it has a default value

    const handleDotClick = (index) => {
        if (index !== activeIndex) {
            setFlipped(true);
            setTimeout(() => {
                setActiveIndex(index);
                setFlipped(false);
            }, 300); // Delay for flip animation
        }
    };

    useEffect(() => {
        async function fetchTesti() {
            try {
                const response = await axios.get('http://localhost:4000/server/testimonial/test/three');
                setTesti(response.data.data); // Ensure response is structured correctly
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            }
        }
        fetchTesti();
    }, []);

    return (
        <div className="relative flex justify-center items-center h-[100vh] sm:h-[140vh] md:h-[70vh] bg-[#4e77bb] text-white px-6">

            <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('/path-to-texture.png')" }}></div>

            <div className="relative z-10 max-w-4xl w-full flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-10">
                {/* Left Section */}
                <div className="text-center md:text-left max-w-md md:mt-2 -mt-15">
                    <div className="flex justify-center md:justify-start mb-4">
                        <img
                            src={person}
                            className="h-20 w-20 filter invert sepia saturate-200 hue-rotate-10 brightness-105 contrast-110"
                            style={{ filter: "invert(27%) sepia(87%) saturate(4228%) hue-rotate(12deg) brightness(96%) contrast(100%)" }}
                            alt="Satisfied Learners"
                        />


                    </div>
                    <h2 className="text-3xl font-bold text-[#fc9b5d]">Satisfied Learners</h2>
                    <p className="mt-2 text-white">
                        Testimonials from our students and parents. We are proud of our track record of success and the satisfaction of our students.
                    </p>
                    <button
                        onClick={() => {
                            navigate('/testimonial')
                            window.scrollTo(0, 0);
                        }}
                        className="mt-4 md:mb-1 mb-14 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full">
                        See all Testimonials
                    </button>
                </div>

                {/* Right Section - Testimonial Card */}
                <motion.div className="relative w-96 min-h-[200px] text-black cursor-pointer"
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="absolute w-full min-h-[200px] flex flex-col justify-center items-center bg-orange-100 rounded-lg p-6 shadow-md -mt-10">
                        <p className="text-sm text-center">{testi?.[activeIndex]?.description || "Loading..."}</p>
                        <h3 className="mt-4 font-bold text-blue-900">{testi?.[activeIndex]?.name || ""}</h3>
                        <h3 className=" mb-6 font-bold text-blue-900">{testi?.[activeIndex]?.tag || ""}</h3>
                    </div>

                    {/* Pagination Dots */}
                    <div className="absolute mt-60 ml-40 flex space-x-2">
                        {testi?.map((_, index) => (
                            <button key={index} onClick={() => handleDotClick(index)}
                                className={`w-3 h-3 rounded-full transition border-2 ${activeIndex === index ? "bg-white border-white" : "bg-gray-500 border-white"}`}
                            ></button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TestimonialSection;
