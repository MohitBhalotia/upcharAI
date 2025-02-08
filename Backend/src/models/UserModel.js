const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const chatbotSchema = new mongoose.Schema(
  {
    messages: [{ type: String, required: true }], // Array of messages
  },
  { timestamps: true }
);

const drugsSchema = new mongoose.Schema(
  {
    medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
    name: {
      type: String,
      required: true,
    },
    dosage: { type: String },
    duration: { type: String },
    quantity: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema(
  {
    hidn: { type: String, required: true, unique: true }, // National ID (Encrypted)
    hid: { type: String, required: true, unique: true }, // Unique ID
    name: { type: String, required: true },
    gender: { type: String },
    statelgd: { type: String },
    distlgd: { type: String },
    dob: { type: String },
    district_name: { type: String },
    mobile: { type: String, required: true },
    address: { type: String },
    state_name: { type: String },
    convo_history: [chatbotSchema], // Array of chatbot conversations
    medicine_history: [
      {
        drugs: [drugsSchema], // Array of medicines
        amount: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);



UserSchema.methods.createAccessToken = function () {
  const token = jwt.sign(
    { name: this.name, userId: this._id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
  return token;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
