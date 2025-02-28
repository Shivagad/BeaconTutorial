import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddTestimonialModal from '../Testimonial/AddTestimonial';
import EditTestimonialModal from '../Testimonial/EditTestimonial';
import DeleteTestimonialModal from '../Testimonial/DeleteTestimonial';

const Testimonials = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editTestimonialId, setEditTestimonialId] = useState(null);
  const [deleteTestimonialId, setDeleteTestimonialId] = useState(null);

  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get("https://beacon-tutorial.vercel.app/server/testimonial");
      setTestimonials(response.data.data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonials([]);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const setToast = (msg) => {
    if (msg.success) {
      toast.success(msg.message);
      fetchTestimonials();
    } else {
      toast.error(msg.message);
    }
  };

  const openEditModal = (id) => {
    setEditTestimonialId(id);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (id) => {
    setDeleteTestimonialId(id);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="p-6 ml-64">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Testimonials</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Testimonial
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="w-full">
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <p className="text-blue-600 text-xl">Seq No: {testimonial.seqno}</p>
                <p className="text-gray-600">Tag: {testimonial.tag}</p>
                <p className="text-gray-700">{testimonial.description}</p>

                {/* Embed YouTube Video */}
                {testimonial.youtubeVideoLink && (
                  <div className="mt-4">
                    <iframe
                      width="100%"
                      height="200"
                      src={`https://www.youtube.com/embed/${testimonial.youtubeVideoLink.split("v=")[1]?.split("&")[0]}`}
                      title="YouTube video"
                      frameBorder="0"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openEditModal(testimonial._id)}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => openDeleteModal(testimonial._id)}
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddTestimonialModal
        setToast={setToast}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <EditTestimonialModal
        setToast={setToast}
        isEditOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        id={editTestimonialId}
      />

      <DeleteTestimonialModal
        setToast={setToast}
        isDeleteOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        id={deleteTestimonialId}
      />
    </div>
  );
};

export default Testimonials;
