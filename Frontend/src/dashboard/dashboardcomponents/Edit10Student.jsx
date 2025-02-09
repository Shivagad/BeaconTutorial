import React, { useState, useRef, useEffect } from "react";
import { X, Upload } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../Context/AuthProvider";

const Edit10StudentModal = ({ isEditOpen, onClose, setToast2,id }) => {
    const { currentUser } = useAuth();
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        seqno: "",
        percentage: "",
        image: "",
        subjects: {
            math: "",
            science: "",
        },
        board: "",
        tags: "",
    });
    const [previewImage, setPreviewImage] = useState("");

    // if (!isOturn null;pen) re

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result;
                setPreviewImage(result);
                setFormData({ ...formData, image: result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault();
        const formData = new FormData();
        formData.append("firstName", formData.firstName);
        formData.append("lastName", formData.lastName);
        formData.append("percentage", formData.percentage);
        formData.append("math", formData.subjects.math);
        formData.append("science", formData.subjects.science);
        formData.append("board", formData.board);
        formData.append("tags", formData.tags);
        formData.append("seqno", formData.seqno);
        if (fileInputRef.current.files[0]) {
            formData.append("image", fileInputRef.current.files[0]);
        }

        try {
            const response = await axios.put(`http://localhost:4000/server/thenth/students/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.success) {
                setToast2({ success: true, message: "Student updated successfully" });
            } else {
                setToast2({ success: false, message: "Error updating student" });
            }
        } catch (error) {
            setToast2({ success: false, message: "Error updating student" });
        }
        onClose();
    };

    const fetchAllDetails = async () => {
        try {
            if (currentUser) {
                const response = await axios.get(`http://localhost:4000/server/thenth/students/getbyid/${id}`);
                setFormData({
                    seqno: response.data.seqno || "",
                    firstName: response.data.firstName || "",
                    lastName: response.data.lastName || "",
                    percentage: response.data.percentage || "",
                    image: response.data.image || "",
                    subjects: {
                        math: response.data.subjects?.math || "",
                        science: response.data.subjects?.science || "",
                    },
                    board: response.data.board || "",
                    tags: response.data.tags || "",
                });
                // If an image is returned, set it as the preview image
                if (response.data.image) {
                    setPreviewImage(response.data.image);
                }
            }
        } catch (error) {
            console.error("Error fetching student details:", error);
        }
    };

    useEffect(() => {
        fetchAllDetails();
    }, [currentUser]);

    return isEditOpen ? (<> <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-lg p-6 mt-20 w-full max-w-3xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Edit 10th Topper</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Personal Information
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    value={formData.firstName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, firstName: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    value={formData.lastName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, lastName: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sequence Number
                                </label>
                                <input
                                    type="number"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    value={formData.seqno}
                                    onChange={(e) =>
                                        setFormData({ ...formData, seqno: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Student Photo
                                </label>
                                <div className="flex flex-col items-center space-y-4">
                                    {previewImage ? (
                                        <div className="relative w-40 h-40">
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPreviewImage("");
                                                    setFormData({ ...formData, image: "" });
                                                }}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
                                        >
                                            <Upload className="w-8 h-8 mb-2" />
                                            <span className="text-sm">Upload Photo</span>
                                        </button>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Marks & Tags */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Marks & Tags
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Percentage
                                </label>
                                <input
                                    type="number"
                                    step="any"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    value={formData.percentage}
                                    onChange={(e) =>
                                        setFormData({ ...formData, percentage: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Math Marks
                                </label>
                                <input
                                    type="number"
                                    step="any"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    value={formData.subjects.math}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            subjects: { ...formData.subjects, math: e.target.value },
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Science Marks
                                </label>
                                <input
                                    type="number"
                                    step="any"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    value={formData.subjects.science}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            subjects: { ...formData.subjects, science: e.target.value },
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Board Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    value={formData.board}
                                    onChange={(e) =>
                                        setFormData({ ...formData, board: e.target.value })
                                    }
                                    placeholder="Enter Board Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tags
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    value={formData.tags}
                                    onChange={(e) =>
                                        setFormData({ ...formData, tags: e.target.value })
                                    }
                                    placeholder="Enter tag like, Board Topper"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Update Student
                    </button>
                </div>
            </form>
        </div>
    </div>
    </>
    ) : null
};

export default Edit10StudentModal;
