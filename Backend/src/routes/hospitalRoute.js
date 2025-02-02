const express = require("express");
const getNearbyHospital=require('../controllers/hospitalController')
const router = express.Router();

router.route("/get-nearby-hospitals").get(getNearbyHospital);

module.exports = router;
