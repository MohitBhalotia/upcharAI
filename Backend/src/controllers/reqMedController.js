const User = require("../models/UserModel");
const twilio = require("twilio");

// Initialize Twilio client with environment variables
const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Controller for requesting medicine
const reqMed = async (req, res) => {
  const { mediName, quantity } = req.body;

  if (!mediName || !quantity) {
    return res
      .status(400)
      .json({ error: "Medicine name and quantity are required" });
  }

  if (quantity <= 0) {
    return res
      .status(400)
      .json({ error: "Quantity must be a positive number" });
  }

  try {
    // Validate userID
    const userID = req.user.userId;
    if (!userID) {
      return res.status(400).json({ error: "User ID is missing from request" });
    }

    // Find the user
    const user = await User.findById(userID.toString());
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the new medicine request
    const newRequest = {
      mediName,
      quantity,
      userId: userID,
    };

    user.requestedMedicine.push(newRequest);
    await user.save();

    res.status(201).json({
      message: "Medicine request submitted successfully",
      requestedMedicine: user.requestedMedicine,
    });
  } catch (error) {
    console.error("Error processing medicine request:", error);
    res.status(500).json({
      error: "Failed to process medicine request",
      details: error.message,
    });
  }
};

// Controller to get all requested medicines for the admin panel
const getAllReqMed = async (req, res) => {
  try {
    // Fetch all users with only the requestedMedicine field
    const users = await User.find({}, "name requestedMedicine");

    // Flatten the result to create a single list of requested medicines
    const allRequestedMedicines = users.flatMap((user) => {
      return user.requestedMedicine.map((medicine) => ({
        userId:user._id,
        userName: user.name,
        mediName: medicine.mediName,
        quantity: medicine.quantity,
        requestedAt: medicine.createdAt,
      }));
    });

    res.status(200).json({
      message: "All requested medicines retrieved successfully",
      medicines: allRequestedMedicines,
    });
  } catch (error) {
    console.error("Error fetching requested medicines:", error);
    res.status(500).json({
      error: "Failed to retrieve requested medicines",
      details: error.message,
    });
  }
};

// Controller to get user's requested medicines
const getMyReqMed = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User's requested medicines retrieved successfully",
      requestedMedicines: user.requestedMedicine,
    });
  } catch (error) {
    console.error("Error fetching user's requested medicines:", error);
    res.status(500).json({
      error: "Failed to retrieve requested medicines",
      details: error.message,
    });
  }
};

// Controller to send message to user about medicine arrival using Twilio
const sendMedicineArrivalMessage = async (req, res) => {
  const { userId } = req.query;
  const { medicine } = req.body;

  if (!medicine) {
    return res.status(400).json({ error: "Medicine name is required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send SMS using Twilio
    await client.messages.create({
      body: `Dear ${user.name}, your requested Medicine : ${medicine} arrived in the kiosk`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${user.mobile}`,
    });

    res.status(200).json({
      message: `Notification sent to ${user.name} at ${user.mobile}`,
    });
  } catch (error) {
    console.error("Error sending message to user:", error);
    res.status(500).json({
      error: "Failed to send message",
      details: error.message,
    });
  }
};

module.exports = {
  reqMed,
  getAllReqMed,
  getMyReqMed,
  sendMedicineArrivalMessage,
};
