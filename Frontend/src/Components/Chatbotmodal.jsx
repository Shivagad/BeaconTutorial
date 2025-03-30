import { useState, useEffect } from "react";
import { X } from "react-feather";
import axios from "axios";

const ChatModal = ({ isChatOpen, setIsChatOpen }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    if (isChatOpen) {
      const welcomeMessage = "Welcome! At Beacon Tutorial, how can we assist you today?";
      setChat([{ role: "bot", content: welcomeMessage }]);
    }
  }, [isChatOpen]);

  const sendMessage = async () => {
    if (!message) return;
    const newChat = [...chat, { role: "user", content: message }];
    setChat(newChat);
    setMessage("");

    try {
      const res = await axios.post("https://beacon-tutorial.vercel.app/server/chat", { message });
      setChat([...newChat, { role: "bot", content: res.data.reply }]);
    } catch (error) {
      setChat([
        ...newChat,
        { role: "bot", content: "Sorry, there was an error fetching the response." },
      ]);
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
          <div key={index} className={`mb-3 ${msg.role === "bot" ? "text-gray-700" : "text-blue-600"}`}>
            <p className={`p-2 rounded-lg ${msg.role === "bot" ? "bg-gray-200" : "bg-blue-100"}`}>
              {msg.content}
            </p>
          </div>
        ))}
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
    </div>
  );
};

export default ChatModal;
