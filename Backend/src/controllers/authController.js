const User = require("../models/UserModel");
const authController = async (req, res) => {
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
  let user = await User.findOne({ hidn });
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
  }

  const token = user.createAccessToken();
  res.status(201).json({ token, msg: "Login successfull" });
};

module.exports = authController;
