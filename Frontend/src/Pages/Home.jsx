import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, GraduationCap, Trophy, Users, BookOpen, BrainCircuit, Calculator, Clock, Award } from 'lucide-react';
import Navbar from "../Components/Navbar";
import axios from 'axios';
import Footer from '../Components/Footer'
const courses = [
  { id: 1, title: "JEE Main & Advanced", icon: Calculator, description: "Comprehensive preparation for IIT entrance", students: "10,000+" },
  { id: 2, title: "NEET Preparation", icon: BrainCircuit, description: "Complete medical entrance preparation", students: "8,000+" },
  { id: 3, title: "CET Coaching", icon: BookOpen, description: "State-level engineering entrance", students: "15,000+" },
  { id: 4, title: "Class 12th Excellence", icon: GraduationCap, description: "Board exam preparation", students: "12,000+" }
];

function Home() {
    const [posters, setPosters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchPosters = async () => {
            try {
                const response = await axios.get("http://localhost:4000/server/poster/getallposter");
                setPosters(response.data.data || []);
            } catch (error) {
                console.error("Error fetching posters:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosters();
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

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Carousel */}
                <div className="relative h-[35vh] ">
                    {posters.length > 0 ? (
                        posters.map((poster, index) => (
                            <div
                                key={poster.id || `poster-${index}`}
                                className={`absolute inset-0 transition-opacity duration-1000 ${
                                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                               <img src={poster.imagePath} alt={`Poster ${index + 1}`} className="w-full h-full object-contain" />
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">No posters available</p>
                        </div>
                    )}

                    {/* Carousel Buttons */}
                    {posters.length > 1 && (
                        <>
                            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all">
                                <ChevronLeft size={24} />
                            </button>
                            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all">
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}
                </div>

                {/* Stats Section */}
                <div className="bg-blue-600 text-white py-12">
                    <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: Users, value: "50,000+", label: "Students" },
                            { icon: Trophy, value: "95%", label: "Success Rate" },
                            { icon: GraduationCap, value: "200+", label: "Expert Faculty" },
                            { icon: Award, value: "15+", label: "Years Experience" }
                        ].map((stat, index) => (
                            <div key={index}>
                                <stat.icon className="w-8 h-8 mx-auto mb-2" />
                                <div className="text-3xl font-bold">{stat.value}</div>
                                <div className="text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popular Courses */}
                <div className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Popular Courses</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {courses.map((course) => (
                                <div key={course.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                                    <course.icon className="w-12 h-12 text-blue-600 mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                                    <p className="text-gray-600 mb-4">{course.description}</p>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Users className="w-4 h-4 mr-2" />
                                        {course.students} students
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: BookOpen, title: "Comprehensive Study Material", text: "Well-researched and regularly updated study materials designed by experts" },
                                { icon: Users, title: "Experienced Faculty", text: "Learn from the best teachers with years of experience" },
                                { icon: Clock, title: "Regular Practice Tests", text: "Weekly tests and assessments to track your progress" }
                            ].map((feature, index) => (
                                <div key={index} className="text-center p-6">
                                    <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-blue-600 text-white py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Journey Today</h2>
                        <p className="mb-8 text-lg">Join thousands of successful students who achieved their dreams with us</p>
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                            Enroll Now
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        
        </>
    );
}

export default Home;
