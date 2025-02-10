import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddPosterModal from '../Poster/AddPosterModal';
import EditPosterModal from '../Poster/EditPosterModal';
import DeletePosterModal from '../Poster/DeletePosterModal';

const Poster = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editPosterId, setEditPosterId] = useState(null);
  const [deletePosterId, setDeletePosterId] = useState(null);

  const [posters, setPosters] = useState([]);


  const fetchPosters = async () => {
    try {
      const response = await axios.get("http://localhost:4000/server/poster/getallposter");
      setPosters(response.data.data || []);
    } catch (error) {
      console.error("Error fetching posters:", error);
      setPosters([]);
    }
  };

  useEffect(() => {
    fetchPosters();
  }, []);

  const setToast = (msg) => {
    msg.success ? toast.success(msg.message) : toast.error(msg.message);
    fetchPosters();
  };

  const openEditModal = (id) => {
    setEditPosterId(id);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (id) => {
    setDeletePosterId(id);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="p-6 ml-64">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Posters</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Poster
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posters.map((poster) => (
          <div
            key={poster._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            {poster.imagePath && (
              <img
                src={poster.imagePath}
                alt={poster.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{poster.name}</h3>
                <p className="text-blue-600 text-xl">Seq No: {poster.seqno}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openEditModal(poster._id)}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => openDeleteModal(poster._id)}
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddPosterModal
        setToast={setToast}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <EditPosterModal
        setToast={setToast}
        isEditOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        id={editPosterId}
      />

      <DeletePosterModal
        setToast={setToast}
        isDeleteOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        id={deletePosterId}
      />
    </div>
  );
};

export default Poster;
