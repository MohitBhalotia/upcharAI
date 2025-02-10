const express = require("express");
const { addToCart, getCart, updateCart, removeFromCart } = require("../controllers/cartController");
const guestMiddleware = require("../middlewares/guestMiddleware");

const router = express.Router();

router.route("/add-to-cart").post(guestMiddleware, addToCart);
router.route("/get-cart/:userId").get( getCart);
router.route('/update-cart').patch(guestMiddleware,updateCart)
router.route('/remove-from-cart/:medicineId').delete(guestMiddleware,removeFromCart)

module.exports = router;
