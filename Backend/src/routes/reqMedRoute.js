const express = require("express");
const {
  reqMed,
  getAllReqMed,
  getMyReqMed,
  sendMedicineArrivalMessage,
} = require("../controllers/reqMedController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminAuth = require("../middlewares/adminAuth");
const router = express.Router();

router.route("/req").post(authMiddleware, reqMed);
router.route("/get-all-req").get(adminAuth, getAllReqMed);
router.route("/get-my-req").get(authMiddleware, getMyReqMed);
router.route("/send-message").post(adminAuth, sendMedicineArrivalMessage);

module.exports = router;
