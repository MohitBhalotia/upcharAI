const express = require("express");
const {
  loginWithQr,
  getUser,
  loginwithAbha,
  adminLogin
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/login-qr").post(loginWithQr);
router.route("/login-admin").post(adminLogin);
router.route("/login-abha").post(loginwithAbha);
router.route("/get-user").get(authMiddleware, getUser);

module.exports = router;
