const express = require("express");
const { loginWithQr, getUser } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/login-qr").post(loginWithQr);
router.route("/get-user").get(authMiddleware, getUser);

module.exports = router;
