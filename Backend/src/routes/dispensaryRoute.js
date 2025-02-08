const express = require("express");
const {getMedicines,buyMedicine} = require("../controllers/medicineConroller");

const router = express.Router();

router.route("/get-medicines").post(getMedicines);
router.route("/buy-medicines").patch(buyMedicine);

module.exports = router;
