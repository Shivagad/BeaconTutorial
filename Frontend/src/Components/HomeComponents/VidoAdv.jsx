import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainWebpage = () => {
    const [videoData, setVideoData] = useState(null);
    const [videoKey, setVideoKey] = useState(Date.now());
    const [isLoading, setIsLoading] = useState(true);

    // Function to fetch the video metadata
    const fetchVideo = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("https://beacon-tutorial.vercel.app/server/ads/metadata");
            console.log("Video metadata:", res.data);

            if (res.data) {
                setVideoData(res.data);
                setVideoKey(Date.now());
            } else {
                setVideoData(null);
            }
        } catch (err) {
            console.error("Error fetching video metadata:", err);
            setVideoData(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVideo();
    }, []);

    return (
        <div className="container mx-auto px-4 py-20 bg-white">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="flex flex-col md:flex-row gap-8">
                {/* Left side - Coaching Institute Info */}
                <div className="w-full md:w-1/2">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">Beacon Tutorials Coaching Institute</h1>

                    <div className="prose max-w-none">
                        <p className="mb-4">
                            Welcome to Beacon Tutorials Coaching Institute, your guiding light to academic excellence.
                            We specialize in personalized education that illuminates the path to success for every student.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Our Approach</h2>
                        <p className="mb-4">
                            At Beacon Tutorials, we believe in a holistic approach to education. Our experienced faculty
                            combines traditional teaching methods with innovative techniques to ensure comprehensive
                            understanding of subjects and concepts.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Our Programs</h2>
                        <ul className="list-disc pl-5 mb-4">
                            <li>Competitive Exam Preparation</li>
                            <li>School Curriculum Support</li>
                            <li>Specialized Subject Coaching</li>
                            <li>Career Counseling</li>
                            <li>Skill Development Workshops</li>
                        </ul>

                        <p>
                            Join us today and experience the difference that personalized, quality education can make
                            in your academic journey!
                        </p>
                    </div>
                </div>

                {/* Right side - Advertisement */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-start">


                    {isLoading ? (
                        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">Loading advertisement...</p>
                        </div>
                    ) : videoData ? (
                        <div className="w-full bg-white rounded-lg shadow-md p-4">

                            <video
                                key={videoKey}
                                autoPlay
                                muted
                                loop
                                controls
                                className="w-full h-auto rounded-lg"
                                src={`https://beacon-tutorial.vercel.app/server/ads/video`}
                            ></video>


                        </div>
                    ) : (
                        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">No advertisements available at this time.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainWebpage;