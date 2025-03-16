import React, { useState, useEffect } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddBlogModal from "../Blog/AddBlogModal";
import EditBlogModal from "../Blog/EditBlogModal";
import DeleteBlogModal from "../Blog/DeleteBlogModal";

const BlogManagement = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);
  const [deleteBlogId, setDeleteBlogId] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "https://beacon-tutorial.vercel.app/server/blog/getall"
      );
      console.log(response.data);
      
      response.data ? setBlogs(response.data) : setBlogs([]);
    } catch (error) {
      setBlogs([]);
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const setToast = (msg) => {
    msg.success ? toast.success(msg.message) : toast.error(msg.message);
    fetchBlogs();
  };

  const openEditModal = (id) => {
    setEditBlogId(id);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (id) => {
    setDeleteBlogId(id);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="p-6 ml-64">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Blog Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Blog
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.length !== 0 &&
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              {blog.imagePath.length>0 && (
                <img
                  src={blog.imagePath[0]}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                  <p className="text-gray-600">
                    {blog.content.substring(0, 100)}...
                  </p>
                  <p className="text-blue-600 text-xl">Author: {blog.author}</p>
                  <p className="text-yellow-500 text-xl">
                    Rating: {blog.rating} ⭐
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(blog._id)}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => openDeleteModal(blog._id)}
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <AddBlogModal
        setToast={setToast}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <EditBlogModal
        setToast={setToast}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        blogId={editBlogId}
      />

      <DeleteBlogModal
        setToast={setToast}
        isDeleteOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        id={deleteBlogId}
      />
    </div>
  );
};

export default BlogManagement;
