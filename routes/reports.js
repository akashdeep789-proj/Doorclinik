const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// File storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure 'uploads/' folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Controller
const reportController = require("../controllers/report");

// Routes

// GET /ai-report → show upload form
router.get("/", reportController.showUploadForm);

// POST /ai-report/upload → handle file upload + create report job
router.post("/upload", upload.single("reportFile"), reportController.handleUpload);

// GET /ai-report/result/:jobId → show summary + video
router.get("/result/:jobId", reportController.showResult);

module.exports = router;
