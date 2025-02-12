const express = require("express");
const router = express.Router();
const { makeEmergencyCall } = require("../controllers/sosController");

router.post("/sos-call", makeEmergencyCall);

module.exports = router;
