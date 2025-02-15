const express = require("express");
const {
  bookAppointment,
  getAllAppointments,
  getMyAppointments,
} = require("../controllers/appointmentController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminAuth = require("../middlewares/adminAuth");

const router = express.Router();

// Route to book an appointment
router.post("/book", authMiddleware, bookAppointment);

// Route to get all appointments (admin access)
router.get("/all",adminAuth, getAllAppointments);

// Route to get appointments for the logged-in user
router.get("/my", authMiddleware, getMyAppointments);

module.exports = router;
