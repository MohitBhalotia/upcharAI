const express = require("express");
const multerMiddleware = require("../middlewares/multer");
const {
  getMedicines,
  addMedicine,
  updateMedicine,
  removeMedicine,
} = require("../controllers/medicineController"); // Fixed typo
const adminAuth = require("../middlewares/adminAuth");

const router = express.Router();

// Routes
router.get("/get-medicines", getMedicines);
router.post(
  "/add-medicine",
  adminAuth,
  multerMiddleware.single("image"),
  addMedicine
); // Use .single("image") for single file
router.patch("/update-medicine/:medicineId", adminAuth, updateMedicine);
router.delete("/remove-medicine/:medicineId", adminAuth, removeMedicine);

module.exports = router;
