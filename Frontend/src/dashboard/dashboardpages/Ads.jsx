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
  const [deleteAdId, setDeleteAdId] = useState(null);
  const [adsList, setAdsList] = useState([]);

  const fetchAds = async () => {
    try {
      const response = await axios.get("http://localhost:4000/server/ads");
      setAdsList(response.data.data || []);
    } catch (error) {
      console.error("Error fetching ads:", error);
      setAdsList([]);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const setToast = (msg) => {
    msg.success ? toast.success(msg.message) : toast.error(msg.message);
    fetchAds();
  };

  const openDeleteModal = (id) => {
    setDeleteAdId(id);
    setIsDeleteModalOpen(true);
  };
  const getYouTubeVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match && match[1] ? match[1] : null;
  };
  

  return (
    <div className="p-6 ml-64">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ads</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Ad
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {adsList.map((ad) => (
          <div
            key={ad._id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {ad.title}
            </h3>

            {ad.videoUrl && (
  <div className="relative w-full h-48 mb-3 overflow-hidden rounded-md shadow-md bg-gray-100">
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${getYouTubeVideoId(ad.videoUrl)}?autoplay=0&controls=1&modestbranding=1&showinfo=0&rel=0`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={ad.title}
      className="w-full h-full object-cover rounded-md"
    ></iframe>
  </div>
)}


            <div className="flex justify-end">
              <button
                onClick={() => openDeleteModal(ad._id)}
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddAdModal
        setToast={setToast}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <DeleteAdModal
        setToast={setToast}
        isDeleteOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        id={deleteAdId}
      />
    </div>
  );
};

export default Ads;
