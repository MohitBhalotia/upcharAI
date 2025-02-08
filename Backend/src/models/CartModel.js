const mongoose = require("mongoose");

const cartItemSchema = mongoose.Schema({
  medicineId: {
    type: mongoose.Types.ObjectId,
    ref: "Medicine",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = mongoose.Schema({
  cart: {
    type: [cartItemSchema],
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
