import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

const images = [
    "/images/beacon_class1.jpg", "images/calss1.jpg", "images/class2.jpg",
    "images/class3.jpg", "images/calss1.jpg", "images/cbse.jpg"
];
const ClassGallery = () => {
    const [selectedImage, setSelectedImage] = useState(null)

    return (
        <div className="min-h-screen bg-white py-16 px-4">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-16">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Sparkles className="text-orange-500 w-6 h-6" />
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm font-medium text-orange-500 tracking-wider uppercase"
                    >
                        Explore Our Spaces
                    </motion.span>
                    <Sparkles className="text-orange-500 w-6 h-6" />
                </div>

                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-5xl font-bold text-[#E85900] mb-6"
                >
                    Overview - Class Gallery
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-600 max-w-2xl mx-auto"
                >
                    A look into our student-oriented classrooms and quality facilities
                    that help students study with full concentration and focus.
                </motion.p>
            </div>

            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto -mb-12">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 auto-rows-[230px]">
                    {images.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative cursor-pointer group ${index % 3 === 0 ? "row-span-0 lg:row-span-2" : ""
                                }`}
                            onClick={() => setSelectedImage(index)}
                        >
                            <div className="relative h-[200px] md:h-full overflow-hidden rounded-2xl">
                                <img
                                    src={src}
                                    alt={`Gallery ${index + 1}`}
                                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative max-w-5xl w-full"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X size={32} className="text-black" />
                            </button>

                            <div className="relative">
                                <img
                                    src={images[selectedImage]}
                                    alt={`Gallery ${selectedImage + 1}`}
                                    className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                                />

                                <button
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
                                    onClick={e => {
                                        e.stopPropagation()
                                        setSelectedImage(
                                            (selectedImage - 1 + images.length) % images.length
                                        )
                                    }}
                                >
                                    <ChevronLeft size={40} className="text-black" />
                                </button>

                                <button
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
                                    onClick={e => {
                                        e.stopPropagation()
                                        setSelectedImage((selectedImage + 1) % images.length)
                                    }}
                                >
                                    <ChevronRight size={40} className="text-black" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ClassGallery
