import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ResultSection = ({ title, students }) => {
  const scrollRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardsPerRow, setCardsPerRow] = useState(5); // Default for Desktop

  // Touch swipe variables
  let touchStartX = 0;
  let touchEndX = 0;

  useEffect(() => {
    const checkScrollable = () => {
      if (scrollRef.current) {
        const firstCard = scrollRef.current.querySelector(".card");
        if (firstCard) {
          setCardWidth(firstCard.offsetWidth + 16); // Including gap
        }
        setShowButtons(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
      }
    };

    const updateCardsPerRow = () => {
      if (window.innerWidth < 640) {
        setCardsPerRow(2); // Mobile
      } else {
        setCardsPerRow(5); // Desktop
      }
      checkScrollable();
    };

    updateCardsPerRow();
    window.addEventListener("resize", updateCardsPerRow);
    return () => window.removeEventListener("resize", updateCardsPerRow);
  }, [students]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  // ✅ **Touch event handlers for swipe**
  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!scrollRef.current) return;
    const swipeDistance = touchStartX - touchEndX;
    if (swipeDistance > 50) {
      // Swipe left → Scroll Right
      scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    } else if (swipeDistance < -50) {
      // Swipe right → Scroll Left
      scrollRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full max-w-[90rem] mx-auto px-4 pt-24 py-12 rounded-2xl shadow-lg bg-lightblue-100 mb-6">
      <div className="max-w-[90rem] mx-auto px-4 bg-[#fff7e6]">
        <div id="resultGrid" className="sticky z-10 -mt-20 mb-8">
          <div className="bg-lightorange-100 border-b-4 py-4 rounded-2xl border-[#4E77BB] shadow-lg">
            <h2 className="text-4xl font-bold text-center text-[#4E77BB]">{title}</h2>
          </div>
        </div>

        {/* ✅ **Add Touch Events for Swipe** */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="overflow-hidden flex gap-4 px-6 pb-12"
            style={{ scrollBehavior: "smooth" }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {students.map((student) => (
              <div
                key={student.id}
                className="card w-56 sm:w-72 lg:w-60 xl:w-64 h-96 flex-shrink-0 bg-blue-100 border-2 border-[#4E77BB] rounded-xl shadow-lg p-5 text-center transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[#4E77BB] shadow-md">
                  <img
                    src={student.imagePath}
                    alt={student.firstName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mt-4 font-semibold text-xl text-[#4E77BB]">
                  {student.firstName} {student.lastName}
                </h3>
              </div>
            ))}
          </div>

          {showButtons && (
            <div className="flex justify-center mt-4">
              <button
                className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow-md transition-all duration-300 hover:scale-110 mx-2"
                onClick={scrollLeft}
                aria-label="Scroll Left"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow-md transition-all duration-300 hover:scale-110 mx-2"
                onClick={scrollRight}
                aria-label="Scroll Right"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultSection;
