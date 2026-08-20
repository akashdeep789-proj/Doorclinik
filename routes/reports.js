const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const reportController = require("../controllers/report");
const fs = require("fs");
const { aiLimiter } = require("../middleware/rateLimiters");

// uploads dir creation
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ===== Routes =====
router.get("/", reportController.showUploadForm);
router.post("/upload-text", aiLimiter, upload.single("reportFile"), reportController.handleTextPreview);
router.get("/text-result/:reportId", reportController.showTextResult);
router.get("/video-result/:reportId", reportController.showVideoResult);
router.get("/tts/:reportId", aiLimiter, reportController.generateTTS);
router.get("/translate/:reportId", aiLimiter, reportController.translateSummary);

// AI Image
router.get("/image/:reportId", reportController.renderImageForm);
router.post("/image/:reportId", aiLimiter, reportController.generateAIImage);

// RAG Query
router.get("/query/:reportId", reportController.renderQueryForm);
router.post("/query/:reportId", aiLimiter, reportController.handleQuery);

module.exports = router;