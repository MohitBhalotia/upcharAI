const express = require("express");
const getNearbyHospital=require('../controllers/hospitalController');
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/get-nearby-hospitals").get(authMiddleware, getNearbyHospital);

module.exports = router;
