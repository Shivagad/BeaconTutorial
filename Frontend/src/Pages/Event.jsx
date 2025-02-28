import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Navbar from "../Components/Navbar"
import axios from "axios"
import Footer from "../Components/Footer"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const FancyDescription = ({ text, maxLength = 70 }) => {
  const [expanded, setExpanded] = useState(false)
  const isLong = text.length > maxLength
  const displayText = expanded || !isLong ? text : text.slice(0, maxLength) + "..."

  return (
    <div
      className="mt-4 p-4 bg-blue-100 bg-opacity-100 rounded-lg shadow-lg text-gray-700 italic"
      style={{ fontFamily: "cursive" }}
    >
      <p className="mb-0 w-full break-words whitespace-normal">
        {displayText}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="underline font-bold"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  )
}

const ImageModal = ({ image, onClose }) => {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-visible"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, rotateY: -30 }}
            animate={{ scale: 1, rotateY: 0 }}
            exit={{ scale: 0.8, rotateY: -30 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="relative w-full -top-5 right-10 text-black-200 hover:text-black-1000 transition-colors z-40 sm:top-0 sm:right-2"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={image}
              alt="Enlarged view"
              className="w-100 h-auto rounded-lg shadow-2xl transform perspective-1000"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const Event = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [expandedEvents, setExpandedEvents] = useState(new Set())
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  const toggleGallery = (eventId) => {
    setExpandedEvents((prev) => {
      const newSet = new Set(prev)
      prev.has(eventId) ? newSet.delete(eventId) : newSet.add(eventId)
      return newSet
    })
  }

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://beacon-tutorial.vercel.app/server/event/getevent')
      console.log(response.data.data)
      setEvents(response.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {/* Header with wave */}
        <div className="bg-[#4E77BB] pt-12 pb-24 relative shadow-md">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-4xl font-bold text-white mb-4">
              Event Gallery
            </h1>
            <p className="text-white text-center max-w-2xl mx-auto">
              At Beacon Tutorials, we are committed to the all-around development
              of our students, which is why we organize trips around Pune to
              enhance their learning experience.
            </p>
          </div>
          {/* Wave SVG */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 100" className="w-full h-auto">
              <path
                fill="#fff"
                fillOpacity="1"
                d="M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,58.7C1120,53,1280,43,1360,37.3L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
              ></path>
            </svg>
          </div>
        </div>

        {/* Events Grid */}
        <div className="bg-white -mb-12 max-w-7xl mx-auto px-6 mt-0 pb-20">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="space-y-4">
                    <Skeleton height={30} width="60%" />
                    <Skeleton height={20} width="40%" />
                    <div className="grid grid-cols-3 gap-2">
                      {Array(6)
                        .fill(0)
                        .map((_, idx) => (
                          <Skeleton key={idx} height={100} />
                        ))}
                    </div>
                    <Skeleton height={30} width="30%" />
                    <Skeleton height={50} />
                  </div>
                ))}
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {events.map((event) => (
                <div key={event._id} className="space-y-4 bg-blue-100 rounded-xl p-3">
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-orange-500 mt-5 mb-1">
                      {event.eventName}
                    </h2>
                    <span className="text-xl text-orange-500">{event.year}</span>
                  </div>
                  {/* Images Grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {event.imagesPath &&
                      event.imagesPath
                        .slice(0, expandedEvents.has(event._id) ? undefined : 6)
                        .map((image, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative aspect-[4/3]"
                          >
                            <img
                              src={image}
                              alt={`${event.title} - Image ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                              onClick={() => setSelectedImage(image)}
                            />
                          </motion.div>
                        ))}
                  </div>
                  {event.imagesPath.length > 6 && (
                    <div className="text-right">
                      <button
                        onClick={() => toggleGallery(event._id)}
                        className="px-6 py-2 bg-[#4e77bb] text-white rounded-full text-sm font-medium hover:bg-[#91b9fa] hover:text-black transition-colors"
                      >
                        {expandedEvents.has(event._id) ? "Show Less" : "Load More"}
                      </button>
                    </div>
                  )}
                  {event.description && (
                    <FancyDescription text={event.description} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <ImageModal
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </div>
      <Footer />
    </>
  )
}

export default Event
