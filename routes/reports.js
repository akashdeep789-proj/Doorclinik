const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const reportController = require("../controllers/report");
const fs = require("fs");

// ===== Automatically create uploads folder if it doesn't exist =====
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Created folder: ${uploadDir}`);
}

// File storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Upload form page
router.get("/", reportController.showUploadForm);

// POST → handle text summary only
router.post("/upload-text", upload.single("reportFile"), reportController.handleTextPreview);

// GET → show text summary
router.get("/text-result/:reportId", reportController.showTextResult);

// GET → generate/show video (existing)
router.get("/video-result/:reportId", reportController.showVideoResult);

// TTS route returns URL
router.get("/tts/:reportId", reportController.generateTTS);

// Translation route returns JSON
router.get("/translate/:reportId", reportController.translateSummary);



module.exports = router;
