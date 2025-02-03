import React, { useState } from "react";

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [translatedResponse, setTranslatedResponse] = useState("");

  const sendMessage = async () => {
    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setResponse(data.reply);
      setTranslatedResponse(data.translated_reply);
    } catch (error) {
      console.error("Error sending message:", error);
      setResponse("Failed to get a response.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Chat with Medical AI</h2>
      <input
        type="text"
        placeholder="Type your question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "300px", padding: "5px" }}
      />
      <button onClick={sendMessage} style={{ marginLeft: "10px", padding: "5px" }}>
        Send
      </button>
      {response && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <strong>AI Response:</strong> {response}
          <br />
          <strong>Hindi Translation:</strong> {translatedResponse}
        </div>
      )}
    </div>
  );
};

export default ChatComponent;