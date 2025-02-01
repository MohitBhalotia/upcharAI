const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/login-qr").post(authController);

module.exports = router;

