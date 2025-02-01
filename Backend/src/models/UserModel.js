const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  hidn: { type: String, required: true, unique: true }, // National ID
  hid: { type: String, required: true, unique: true }, // Unique ID (e.g., email or system-generated)
  name: { type: String, required: true },
  gender: { type: String },
  statelgd: { type: String },
  distlgd: { type: String },
  dob: { type: String },
  district_name: { type: String },
  mobile: { type: String, required: true },
  address: { type: String },
  state_name: { type: String },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.hidn = await bcrypt.hash(this.hidn, salt);
});

UserSchema.methods.createAccessToken = function () {
  const token = jwt.sign(
    { name: this.name, hidn: this.hidn },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
  return token;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
