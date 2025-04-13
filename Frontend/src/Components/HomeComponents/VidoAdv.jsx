import React, { useState, useEffect } from "react";

const VideoAdv = () => {
    const [loading, setLoading] = useState(true);
    const [videoUrl, setVideoUrl] = useState(null);

    // Fetch the YouTube video URL from backend on component mount
    useEffect(() => {
        // Simulated API call: replace with your actual API request.
        // fetch("https://api.example.com/video")
        //   .then((res) => res.json())
        //   .then((data) => {
        //     setVideoUrl(data.videoUrl);
        //     setLoading(false);
        //   })
        //   .catch((error) => {
        //     console.error("Error fetching video URL:", error);
        //     setLoading(false);
        //   });

        // For demonstration purposes, we're using a dummy URL.
        setVideoUrl("https://www.youtube.com/embed/4HrftowDPFA?autoplay=1&mute=1&loop=1&playlist=4HrftowDPFA");
        setLoading(false);
    }, []);

    return (
        <div className="container bg-white mx-auto p-6">
            <div className="flex flex-col md:flex-row items-center rounded-lg overflow-hidden">
                {/* Left Side: Headline and Text */}
                <div className="w-full md:w-1/2 p-6">
                    <h1 className="text-3xl font-bold mb-4 text-gray-800">
                        Empower Your Future with Beacon Tutorials
                    </h1>
                    <p className="text-gray-600">
                        Experience a transformative approach to education with Beacon Tutorials.
                        Discover our innovative platform designed to offer personalized learning,
                        real-time updates, and interactive tools that guide you every step of the way.
                        Let our video showcase how we integrate technology with expert coaching to bring
                        out the best in every student.
                    </p>
                </div>

                {/* Right Side: YouTube Video Embed */}
                <div className="w-full md:w-1/2 p-6 flex justify-center items-center">
                    {loading ? (
                        // Loader
                        <div className="flex items-center justify-center w-full h-64">
                            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
                        </div>
                    ) : (
                        <div className="w-full">
                            <iframe
                                title="YouTube Video"
                                className="rounded-xl w-full h-64 md:h-96"
                                src={videoUrl}
                                frameBorder="0"
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoAdv;
