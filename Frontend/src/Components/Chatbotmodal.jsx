import { useState, useEffect } from "react";
import { X } from "react-feather";
import axios from "axios";

const ChatModal = ({ isChatOpen, setIsChatOpen }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isChatOpen) {
      const welcomeMessage = "Welcome! At Beacon Tutorial, how can we assist you today?";
      setChat([{ role: "bot", content: welcomeMessage }]);
    }
  }, [isChatOpen]);

  // Function to parse bot messages and inject hyperlinks for specific keywords
  const parseBotMessage = (text) => {
    const links = {
      result: "https://www.beacontutorials.com/all-results",
      blog: "https://www.beacontutorials.com/student-corner",
      inquiry: "https://www.beacontutorials.com/inquiry",
      address: "https://www.beacontutorials.com/contact",
      // Add more keywords and corresponding URLs as needed
    };

    let parsed = text;
    Object.keys(links).forEach((keyword) => {
      // Use word boundaries and optional "s" to match singular/plural
      const regex = new RegExp(`\\b(${keyword}(s)?)\\b`, "gi");
      parsed = parsed.replace(
        regex,
        `<a href="${links[keyword]}" target="_blank" class="text-blue-500 underline">$1</a>`
      );
    });
    return parsed;
  };

  const sendMessage = async () => {
    if (!message) return;
    // Add user's message to chat
    const newChat = [...chat, { role: "user", content: message }];
    setChat(newChat);
    setMessage("");
    setLoading(true); // show loader

    try {
      const res = await axios.post("https://beacon-tutorial.vercel.app/server/chat", { message });
      setChat([...newChat, { role: "bot", content: res.data.reply }]);
    } catch (error) {
      setChat([
        ...newChat,
        { role: "bot", content: "Sorry, there was an error fetching the response." },
      ]);
    } finally {
      setLoading(false); // hide loader when response is received
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
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "bot" ? "justify-start" : "justify-end"} mb-3`}
          >
            <div
              className={`p-2 rounded-lg max-w-[75%] ${
                msg.role === "bot" ? "bg-gray-200 text-gray-700" : "bg-blue-100 text-[#4E77BB]"
              }`}
            >
              {msg.role === "bot" ? (
                <span
                  dangerouslySetInnerHTML={{ __html: parseBotMessage(msg.content) }}
                ></span>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2">
            {/* Simple loader spinner */}
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
      
      {/* Inline keyframes for loader spinner */}
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
