import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const images = [
    "/images/beacon_class1.jpg", "images/cbse.jpg", "images/cbse.jpg",
    "images/cbse.jpg", "images/cbse.jpg", "images/cbse.jpg"
];

const ClassGallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between py-10 px-6 bg-white max-w-7xl mx-auto">
            {/* Left-side text content (Moves to right on large screens) */}
            <div className="w-full lg:w-1/2 text-left lg:text-right mb-6 lg:mb-0">
                <h2 className="text-4xl font-bold text-orange-500 mr-10">Overview - Class Gallery</h2>
                <p className="text-gray-600 mt-3 mr-5">
                    A look into our student-oriented classrooms and quality facilities that help students study with full concentration and focus.
                </p>
            </div>

            {/* Image Grid (Moves to left on large screens) */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full lg:w-1/2">
                {images.map((src, index) => (
                    <motion.img
                        key={index}
                        src={src}
                        alt={`Gallery ${index}`}
                        className="w-full h-auto max-w-[300px] rounded-lg shadow-md cursor-pointer mx-auto"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setSelectedImage(src)}
                    />
                ))}
            </div>


            {/* Modal for Image Preview */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                    <motion.div
                        className="relative bg-white rounded-lg shadow-lg p-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <button
                            className=" text-gray-800 hover:text-red-500"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={24} />
                        </button>
                        <img
                            src={selectedImage}
                            alt="Expanded View"
                            className="max-w-full max-h-[80vh] object-contain rounded-md"
                        />
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ClassGallery;
