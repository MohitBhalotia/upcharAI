import React, { useState } from "react";
import axios from "axios";

const QueryBot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = { text: message, sender: "user" };
    setChat([...chat, newMessage]);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        message: newMessage.text,
        session_id: "user123",
      });

      const aiResponse = { text: res.data.translated_response, sender: "ai" };
      setChat([...chat, newMessage, aiResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorResponse = { text: "Failed to get a response.", sender: "ai" };
      setChat([...chat, newMessage, errorResponse]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 border-b bg-blue-500 text-white text-lg font-semibold">
          Medical AI Chatbot
        </div>
        <div className="h-80 overflow-y-auto p-4 space-y-2" id="chat-window">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`p-2 max-w-xs rounded-lg text-white ${
                msg.sender === "user"
                  ? "bg-blue-500 self-end ml-auto"
                  : "bg-gray-400 self-start mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex p-4 border-t bg-gray-50">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg focus:outline-none"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueryBot;
