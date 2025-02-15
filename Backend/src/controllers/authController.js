const User = require("../models/UserModel");
const { NotFoundError, BadRequestError,UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const jwt=require('jsonwebtoken')

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

const loginwithAbha = async (req, res) => {
  const { abha } = req.body;

  if (!abha) {
    throw new BadRequestError("Abha number is required");
  }

  // Function to format ABHA number as XX-XXXX-XXXX-XXXX
  const formatAbha = (abha) => {
    const digits = abha.replace(/\D/g, ""); // Remove non-numeric characters

    if (digits.length !== 14) {
      throw new BadRequestError(
        "Invalid ABHA number. It must be exactly 14 digits."
      );
    }

    return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(
      6,
      10
    )}-${digits.slice(10, 14)}`;
  };

  try {
    const formattedAbha = formatAbha(abha);
    console.log("Formatted ABHA:", formattedAbha);

    const user = await User.findOne({ hidn: formattedAbha });

    if (user) {
      const token = user.createAccessToken();
      res.status(StatusCodes.CREATED).json({ token, msg: "Login successful" });
    } else {
      throw new NotFoundError("Cannot find a user with this ABHA Number");
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
  }
};

const getUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  res.status(StatusCodes.OK).json({ user });
};

const adminLogin = async (req, res) => {
  const { number } = req.body;
  if (!number) {
    throw new BadRequestError("Please enter admin Number");
  }
  if (number === process.env.ADMIN_NUMBER) {
    const token = jwt.sign({ role: "Admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(StatusCodes.OK).json({msg:"Login Successful", token });
  } else {
    throw new UnauthenticatedError("Invalid admin credentials");
  }
};

module.exports = { loginWithQr, getUser, loginwithAbha,adminLogin };
