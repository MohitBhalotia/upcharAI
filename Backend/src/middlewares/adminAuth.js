const jwt = require("jsonwebtoken");
const {UnauthenticatedError} =require ("../errors");

const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication Failed");
  }
  const token = authHeader.split(" ")[1];

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  if (payload.role !== "Admin") {
    throw new UnauthenticatedError(
      "Authentication Failed: Insufficient permissions"
    );
  }
  req.user = { role: payload.role };
  console.log(req.user);

  next();
};

module.exports= adminAuth;
