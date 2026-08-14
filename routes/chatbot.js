const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const chatbotController = require("../controllers/chatbot");

router.post("/query", wrapAsync(chatbotController.handleChatQuery));

module.exports = router;