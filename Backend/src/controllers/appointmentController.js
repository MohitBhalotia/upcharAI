const User = require("../models/UserModel");

// Controller for booking an appointment
const bookAppointment = async (req, res) => {
  const { date, doctorName, hospitalName, address, reason } = req.body;

  if (!date || !doctorName || !reason) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const appointment = {
      date,
      doctorName,
      reason,
      hospitalName,
      address,
      bookedAt: new Date(),
    };

    user.appointments = user.appointments || [];
    user.appointments.push(appointment);
    await user.save();

    res
      .status(201)
      .json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res
      .status(500)
      .json({ error: "Failed to book appointment", details: error.message });
  }
};

// Controller for getting all booked appointments (Admin)
const getAllAppointments = async (req, res) => {
  try {
    const users = await User.find({}, "name appointments");

    const allAppointments = users.flatMap((user) =>
      user.appointments.map((appointment) => ({
        userName: user.name,
        date: appointment.date,
        time: appointment.time,
        doctorName: appointment.doctorName,
        reason: appointment.reason,
        bookedAt: appointment.bookedAt,
      }))
    );

    res.status(200).json({
      message: "All booked appointments retrieved successfully",
      appointments: allAppointments,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({
      error: "Failed to retrieve appointments",
      details: error.message,
    });
  }
};

// Controller for getting appointments booked by the logged-in user
const getMyAppointments = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Your booked appointments retrieved successfully",
      appointments: user.appointments,
    });
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    res.status(500).json({
      error: "Failed to retrieve appointments",
      details: error.message,
    });
  }
};

module.exports = { bookAppointment, getAllAppointments, getMyAppointments };
