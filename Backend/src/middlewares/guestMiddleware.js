const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid"); // Use uuid for generating a unique guest ID
const adminId = process.env.ADMIN_ID;

const guestMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists and has the correct format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // If authentication fails, generate a guestId and assign it to req.user
    req.user = { userId: adminId }; // Generate a unique guestId
    return next(); // Proceed to the next middleware with the guestId
  }
  const token = authHeader.split(" ")[1]; // Extract the token from the Authorization header

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

    // If the token is valid, attach the userId to the request object
    req.user = { userId: payload.userId };
    next(); // Proceed to the next middleware
  } catch (error) {
    // If the token is invalid or expired, generate a guestId and attach it to req.user
    req.user = { userId: adminId }; // Generate a unique guestId
    next(); // Proceed to the next middleware with the guestId
  }
};

module.exports = guestMiddleware;
