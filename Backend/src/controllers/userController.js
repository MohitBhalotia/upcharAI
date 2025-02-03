const { NotFoundError } = require("../errors");
const User = require("../models/UserModel");
const { StatusCodes } = require("http-status-codes");
const getUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  res.status(StatusCodes.OK).json({ user });
};
module.exports = {getUser};
