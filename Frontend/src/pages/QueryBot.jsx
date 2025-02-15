import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ReactMarkdown from 'react-markdown';
import aiBot from "../../public/images/aiBot.svg";
import send from "../../public/images/send.svg";

const QueryBot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatWindowRef = useRef(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URI;
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chat]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = { text: message, sender: "user" };
    setChat((prevChat) => [...prevChat, newMessage]);
    setMessage("");
    setIsTyping(true);

    try {
      const res = await axios.post(
        `${backendUrl}/chat-bot/query`,
        { message: newMessage.text, session_id: "user123" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiResponse = { text: res.data.translated_response, sender: "ai" };
      setChat((prevChat) => [...prevChat, aiResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorResponse = { text: "Failed to get a response.", sender: "ai" };
      setChat((prevChat) => [...prevChat, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#ffffff] p-6 ">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 border-b bg-[#01C38E] text-white text-xl font-semibold flex items-center">
          <img src={aiBot} alt="Medical AI" className="w-10 h-10 mr-2" />
          Medical AI Chatbot
        </div>
        <div
          className="h-[400px] overflow-y-auto p-4 space-y-2"
          ref={chatWindowRef}
        >
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`p-3 max-w-sm rounded-lg text-white text-sm md:text-base break-words ${
                msg.sender === "user"
                  ? "bg-[#01C38E] self-end ml-auto"
                  : "bg-gray-400 self-start mr-auto"
              }`}
            >
              {msg.sender === "ai" ? <ReactMarkdown>{msg.text}</ReactMarkdown> : msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="p-3 max-w-sm rounded-lg bg-gray-400 self-start mr-auto text-white animate-pulse">
              Typing...
            </div>
          )}
        </div>
        <div className="flex p-4 bg-[#C1FFEE] rounded-t-lg">
          <input
            type="text"
            className="flex-1 p-3 bg-white rounded-lg focus:outline-none border border-gray-300"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="ml-3 bg-[#01C38E] text-white font-semibold px-5 py-3 rounded-lg hover:bg-[#01996F] flex items-center transition-all duration-200"
          >
            Send
            <img src={send} alt="Send" className="w-6 h-6 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueryBot;
