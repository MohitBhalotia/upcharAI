const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  buyMedicine,
  getAllOrders,
  getMyOrders,
} = require("../controllers/OrderController");
const adminAuth = require("../middlewares/adminAuth");

const router = express.Router();

// Route to place an order (buy medicine)
router.post("/order-medicine", buyMedicine);

// Route to get all orders (admin only)
router.get("/all-orders", adminAuth, getAllOrders);

// Route to get orders for a specific user
router.get("/my-orders", authMiddleware, getMyOrders);

module.exports = router;
