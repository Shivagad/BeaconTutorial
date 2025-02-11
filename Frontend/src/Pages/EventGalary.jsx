import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const events = [
  {
    id: "1",
    title: "Konkan Trip",
    year: "2023",
    images: [
      "https://images.unsplash.com/photo-1571406384450-0eaa276f8a68?auto=format&fit=crop&q=80&w=600&h=400",
      "https://images.unsplash.com/photo-1571406384579-f127624b6a8e?auto=format&fit=crop&q=80&w=600&h=400",
      "https://images.unsplash.com/photo-1571406384492-d3cb85d46ca7?auto=format&fit=crop&q=80&w=600&h=400",
      "https://images.unsplash.com/photo-1571406384537-b8f0a63d8566?auto=format&fit=crop&q=80&w=600&h=400"
    ]
  },
  {
    id: "2",
    title: "Award Ceremony",
    year: "2023",
    images: [
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=600&h=400",
      "https://images.unsplash.com/photo-1523580494864-10c4a33048c4?auto=format&fit=crop&q=80&w=600&h=400",
      "https://images.unsplash.com/photo-1523580494865-9d70a3e6e6e4?auto=format&fit=crop&q=80&w=600&h=400",
      "https://images.unsplash.com/photo-1523580494866-7b6c95f58f16?auto=format&fit=crop&q=80&w=600&h=400",
      "https://images.unsplash.com/photo-1523580494867-7b6c95f58f17?auto=format&fit=crop&q=80&w=600&h=400",
      "https://images.unsplash.com/photo-1523580494868-7b6c95f58f18?auto=format&fit=crop&q=80&w=600&h=400"
    ]
  },
  {
    id: "3",
    title: "Konkan Trip",
    year: "2022",
    images: [
      "https://images.unsplash.com/photo-1571406384450-0eaa276f8a68?auto=format&fit=crop&q=80&w=600&h=400",
      "https://images.unsplash.com/photo-1571406384579-f127624b6a8e?auto=format&fit=crop&q=80&w=600&h=400"
    ]
  },
  {
    id: "4",
    title: "Surya Shikhi Trip",
    year: "2022",
    images: [
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=600&h=400",
      "https://images.unsplash.com/photo-1523580494864-10c4a33048c4?auto=format&fit=crop&q=80&w=600&h=400"
    ]
  }
]

const EventGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [expandedEvents, setExpandedEvents] = useState(new Set())

  const toggleGallery = eventId => {
    setExpandedEvents(prev => {
      const newSet = new Set(prev)
      prev.has(eventId) ? newSet.delete(eventId) : newSet.add(eventId)
      return newSet
    })
  }

  return (
    <div className="min-h-screen bg-[#4A5B8C]">
      {/* Header with wave */}
      <div className="bg-white pt-12 pb-24 relative">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold text-[#2B3A67] mb-4">
            Event Gallery
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            At Beacon Tutorials, we are committed to the all-around development
            of our students, which is why we organize trips around Pune to
            enhance their learning experience.
          </p>
        </div>
        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" className="w-full h-auto">
            <path
              fill="#4A5B8C"
              fillOpacity="1"
              d="M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,58.7C1120,53,1280,43,1360,37.3L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          {events.map(event => (
            <div key={event.id} className="space-y-4">
              <div className="flex flex-col">
                <h2 className="text-[#FF9B50] text-2xl font-bold mb-2">
                  {event.title}
                </h2>
                <span className="text-[#FF9B50] text-xl">{event.year}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {event.images
                  .slice(0, expandedEvents.has(event.id) ? undefined : 4)
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

              {event.images.length > 4 && (
                <div className="text-right">
                  <button
                    onClick={() => toggleGallery(event.id)}
                    className="px-6 py-2 bg-[#FF9B50] text-white rounded-full text-sm font-medium hover:bg-[#FF8B40] transition-colors"
                  >
                    {expandedEvents.has(event.id) ? "Show Less" : "Load More"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EventGallery;
