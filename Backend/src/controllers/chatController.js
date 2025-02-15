const axios = require("axios");
const User = require("../models/UserModel");

// Controller for sending a request to the chatbot API and storing it in the database
const chatController = async (req, res) => {
  const { message, session_id } = req.body;

  if (!message || !session_id) {
    return res
      .status(400)
      .json({ error: "Message and session_id are required" });
  }

  // Send POST request to the chatbot API
  const response = await axios.post("https://upchar-ai-chat.vercel.app/chat", {
    message,
    session_id,
  });

  // Forward the chatbot's response to the frontend
  const { translated_response, summary } = response.data;

  // Validate userID
  const userID = req.user.userId;
  if (!userID) {
    return res.status(400).json({ error: "User ID is missing from request" });
  }
  
  // Find the user by ID
  const user = await User.findById(userID.toString());
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Add the new message to the convo_history array
  user.convo_history.push({ messages: [message, translated_response] });
  await user.save();

  res.json({
    translated_response,
    summary,
    message_history: user.convo_history,
  });
};

module.exports = { chatController };
