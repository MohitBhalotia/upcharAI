const express = require("express");
const { chatController } = require("../controllers/chatController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/query").post(authMiddleware, chatController);

module.exports = router;
