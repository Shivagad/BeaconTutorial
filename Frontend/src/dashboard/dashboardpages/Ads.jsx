import React, { useState, useEffect } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAdModal from "../Ads/AddAds";
import DeleteAdModal from "../Ads/DeleteAds";

const Ads = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [videoKey, setVideoKey] = useState(Date.now()); // To force video reload when needed

  // Function to fetch the video metadata
  const fetchVideo = async () => {
    try {
      const res = await axios.get("https://beacon-tutorial.vercel.app/server/ads/metadata");
      console.log("Video metadata:", res.data);
      
      if (res.data) {
        setVideoData(res.data);
        // Force video element to reload
        setVideoKey(Date.now());
      } else {
        setVideoData(null);
      }
    } catch (err) {
      console.error("Error fetching video metadata:", err);
      setVideoData(null);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  // Toast notification logic
  const setToast = (msg) => {
    if (msg.success) {
      toast.success(msg.message);
    } else {
      toast.error(msg.message);
    }
    // Refresh video data after actions
    setTimeout(fetchVideo, 1000);
  };

  return (
    <div className="p-6 ml-64">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Video</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Upload Video
        </button>
      </div>

      {videoData ? (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{videoData.title}</h3>
          
          {/* Video element with correct URL */}
          <video
            key={videoKey}
            controls
             className="w-1/4 h-auto rounded-lg mb-4"
            src={`https://beacon-tutorial.vercel.app/server/ads/video`}
          ></video>
          
          <div className="flex justify-end">
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No video uploaded yet.</p>
      )}

      <AddAdModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        setToast={setToast}
      />

      <DeleteAdModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        setToast={setToast}
      />
    </div>
  );
};

export default Ads;