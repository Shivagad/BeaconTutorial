import React, { useState, useRef, useEffect } from "react";
import { Volume2 } from "lucide-react";

const VideoAdv = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    fetch("https://api.example.com/video")
      .then((res) => res.json())
      .then((data) => {
        setVideoUrl(data.videoUrl);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching video URL:", error);
        setLoading(false);
      });
  }, []);

  const toggleMute = () => {
    setIsMuted((prevMuted) => {
      const newMutedState = !prevMuted;
      if (videoRef.current) {
        videoRef.current.muted = newMutedState;
      }
      return newMutedState;
    });
  };

  return (
    <div className="container bg-white mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center rounded-lg overflow-hidden">
        {/* Left Side: Headline and Text */}
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Empower Your Future with Beacon Tutorials
          </h1>
          <p className="text-gray-600">
            Experience a transformative approach to education with Beacon Tutorials. Discover our
            innovative platform, designed to offer personalized learning, real-time updates, and
            interactive tools that guide you every step of the way. Let our video showcase how we
            integrate technology with expert coaching to bring out the best in every student.
          </p>
        </div>

        {/* Right Side: Video with Icon Overlay */}
        <div className="w-full md:w-1/2 p-6 flex justify-center items-center relative">
          {loading ? (
            // Loader Section
            <div className="flex items-center justify-center w-full h-64">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
            </div>
          ) : (
            <div className="relative w-full">
              <video
                ref={videoRef}
                className="rounded-xl w-full"
                src={videoUrl}
                autoPlay
                muted={isMuted}
                loop
                playsInline
              />
              {/* Icon Overlay */}
              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 p-2 bg-gray-700 bg-opacity-60 rounded-full hover:bg-opacity-80 focus:outline-none"
              >
                {isMuted ? (
                  // Muted Icon (Speaker with Slash) using inline SVG
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-volume-off"
                  >
                    <path d="M16 9a5 5 0 0 1 .95 2.293" />
                    <path d="M19.364 5.636a9 9 0 0 1 1.889 9.96" />
                    <path d="M2 2l20 20" />
                    <path d="M7 7l-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11" />
                    <path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686" />
                  </svg>
                ) : (
                  <Volume2 />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoAdv;
