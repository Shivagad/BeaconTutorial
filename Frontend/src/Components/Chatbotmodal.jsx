import { useState, useEffect } from "react";
import { X } from "react-feather";
import axios from "axios";

const links = {
  result: "https://www.beacontutorials.com/all-results",
  course: "https://www.beacontutorials.com/all-courses",
  beacon: "https://www.beacontutorials.com/about",
  about: "https://www.beacontutorials.com/about",
  event: "https://www.beacontutorials.com/event-gallery",
  gallery: "https://www.beacontutorials.com/event-gallery",
  testimonial: "https://www.beacontutorials.com/testimonial",
  feedback: "https://www.beacontutorials.com/testimonial",
  review: "https://www.beacontutorials.com/testimonial",
  blog: "https://www.beacontutorials.com/student-corner",
  inquiry: "https://www.beacontutorials.com/inquiry",
  address: "https://www.beacontutorials.com/contact",
  contact: "https://www.beacontutorials.com/contact",
  details: "https://www.beacontutorials.com/contact",
  scolarship: "https://www.beacontutorials.com/scholarship",
  login: "https://www.beacontutorials.com/login",
};

const getUsefulLinks = (text) => {
  const foundKeywords = new Set();
  // Match words using word boundaries (ignoring punctuation)
  const words = text.match(/\b\w+\b/g);

  if (words) {
    words.forEach((word) => {
      const normalized = word.toLowerCase();
      // Check if the exact word is in our links object
      if (links[normalized]) {
        foundKeywords.add(normalized);
      } else {
        // If word ends with 's', try checking its singular version
        if (normalized.endsWith("s")) {
          const singular = normalized.slice(0, -1);
          if (links[singular]) {
            foundKeywords.add(singular);
          }
        }
      }
    });
  }

  console.log(foundKeywords);


  // Build an array of link objects from the unique keywords
  const foundLinks = [];
  foundKeywords.forEach((keyword) => {
    const linkText =
      keyword === "result"
        ? "Beacon Results"
        : keyword === "beacon" ? "Beacon Tutorials"
          : keyword === "feedback" || keyword === "testimonial" ||
            keyword === "review" || keyword === "student" ? "Beacon Students Reviews"
            : `Beacon ${keyword.charAt(0).toUpperCase() + keyword.slice(1)}`;
    foundLinks.push({ text: linkText, url: links[keyword] });
  });

  console.log(foundLinks);


  return foundLinks;
};

const ChatModal = ({ isChatOpen, setIsChatOpen }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isChatOpen) {
      const welcomeMessage = "Welcome! At Beacon Tutorial, how can we assist you today?";
      // Compute useful links for the welcome message, if any
      // const welcomeLinks = getUsefulLinks(welcomeMessage);
      setChat([{ role: "bot", content: welcomeMessage, links: [] }]);
    }
  }, [isChatOpen]);

  const sendMessage = async () => {
    if (!message) return;
    // Add user's message as plain text (without links)
    const botLinks = getUsefulLinks(message);
    const newChat = [...chat, { role: "user", content: message }];
    setChat(newChat);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("https://beacon-tutorial.vercel.app/server/chat", { message });
      // Compute useful links for the bot response
      // const botLinks = getUsefulLinks(res.data.reply);
      const botMessage = { role: "bot", content: res.data.reply, links: botLinks };
      setChat([...newChat, botMessage]);
    } catch (error) {
      const errorMessage = "Sorry, there was an error fetching the response.";
      setChat([...newChat, { role: "bot", content: errorMessage, links: [] }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  if (!isChatOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-300 z-50">
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <h3 className="text-lg font-semibold">Chat Support</h3>
        <button
          onClick={() => setIsChatOpen(false)}
          className="text-gray-600 hover:text-gray-800"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="h-60 overflow-y-auto p-2 bg-gray-100 rounded mb-2">
        {chat.map((msg, index) => {
          if (msg.role === "user") {
            return (
              <div key={index} className="flex justify-end mb-3">
                <div className="p-2 rounded-lg max-w-[75%] bg-blue-100 text-[#4E77BB]">
                  {msg.content}
                </div>
              </div>
            );
          }

          return (
            <div key={index} className="mb-3">
              <div className="flex justify-start">
                <div className="p-2 rounded-lg max-w-[75%] bg-gray-200 text-gray-700">
                  {msg.content}
                </div>
              </div>
              {/* Render Useful Links below bot response if any exist */}
              {msg.links && msg.links.length > 0 && (
                <div className="mt-1 ml-2 text-sm">
                  <div className="font-semibold">Useful Links:</div>
                  <ul className="list-disc list-inside">
                    {msg.links.map((link, i) => (
                      <li key={i}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2">
            <div
              style={{
                border: "4px solid #f3f3f3",
                borderRadius: "50%",
                borderTop: "4px solid #3498db",
                width: "16px",
                height: "16px",
                animation: "spin 1s linear infinite",
              }}
            />
            <span>Loading...</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
        >
          Send
        </button>
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ChatModal;
