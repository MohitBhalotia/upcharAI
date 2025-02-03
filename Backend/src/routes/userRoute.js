const express = require("express");
const { getUser } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/get-user").get(authMiddleware, getUser);

module.exports = router;
