const User = require("../models/UserModel");
const { NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const loginWithQr = async (req, res) => {
  const {
    hidn,
    hid,
    name,
    gender,
    statelgd,
    distlgd,
    dob,
    district_name,
    mobile,
    address,
    state_name,
  } = req.body;
  let user = await User.findOne({ hid });
  if (!user) {
    user = await User.create({
      hidn,
      hid,
      name,
      gender,
      statelgd,
      distlgd,
      dob,
      district_name,
      mobile,
      address,
      state_name,
    });
    console.log("New User created");
  }

  const token = user.createAccessToken();
  res.status(StatusCodes.CREATED).json({ token, msg: "Login successfull" });
};

const getUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  res.status(StatusCodes.OK).json({ user });
};

module.exports = { loginWithQr, getUser };
