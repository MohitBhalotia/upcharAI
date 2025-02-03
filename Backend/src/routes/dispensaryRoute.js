const express = require("express");
const {getMedicines,buyMedicine} = require("../controllers/medicineConroller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/get-medicines").get(getMedicines);
router.route("/buy-medicines").patch(buyMedicine);

module.exports = router;
