import { useState } from "react";
import { ChevronUp, ChevronDown } from "react-feather";
import ChatbotModal from "./Chatbotmodal";

const FloatingDropdown = ({ setIsChatOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 transition-all duration-500 ease-in-out">
      <div className="relative flex flex-col items-end">
        {dropdownOpen && (
          <div className="flex flex-col items-end mb-2 space-y-2">
            <a
              href="https://wa.me/918446222268"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 p-3 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-6 h-6"
              />
            </a>
            <a
              href="tel:+918446222268"
              className="bg-blue-500 p-3 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out"
            >
              <img
                src={"/images/phone.png"}
                alt="Phone call"
                className="w-6 h-6 filter invert brightness-0 contrast-200"
              />
            </a>
            <button
              onClick={() => setIsChatOpen(true)}
              className="bg-blue-500 p-3 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out"
            >
              <img
                src={"/images/chatbot.png"}
                alt="Phone call"
                className="w-7 h-7 filter invert brightness-0 contrast-200"
              />
            </button>
          </div>
        )}
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className={`bg-blue-500 shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out ${
            dropdownOpen
              ? "px-6 py-3 rounded-full"
              : "p-4 rounded-full"
          }`}
        >
          {dropdownOpen ? (
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">Need Help?</span>
              <ChevronDown className="text-white" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
            <span className="text-white font-semibold">Need Help?</span>
            <ChevronUp className="text-white" />
          </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default FloatingDropdown;
