const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const chatbotController = require("../controllers/chatbot");
const { aiLimiter } = require("../middleware/rateLimiters");

router.post("/query", aiLimiter, wrapAsync(chatbotController.handleChatQuery));

module.exports = router;