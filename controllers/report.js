const Report = require('../models/report');
const { summarizeText } = require("../utils/hfSummarizer");
const extractTextFromFile = require("../utils/extractText");
const chunkText = require("../utils/chunkText");
const tts = require("../utils/tts");
const translateText = require("../utils/translate");
const axios = require("axios");

// ===== Upload and Text Summary =====
const showUploadForm = (req, res) => {
  res.render("reports/upload");
};

const handleTextPreview = async (req, res) => {
  try {
    if (!req.file) {
      req.flash("error", "Please upload a PDF or image file!");
      return res.redirect("/ai-report");
    }

    const text = await extractTextFromFile(req.file.path);
    const chunks = chunkText(text, 1500); 
    let finalSummary = "";

    for (const chunk of chunks) {
      const chunkSummary = await summarizeText(chunk);
      finalSummary += chunkSummary + " ";
    }
    finalSummary = finalSummary.trim();

    const newReport = new Report({
      filePath: req.file.path,
      status: "done",
      summaryText: finalSummary,
      videoUrl: "",
    });
    await newReport.save();

    res.redirect(`/ai-report/text-result/${newReport._id}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Error generating summary");
    res.redirect("/ai-report");
  }
};

// ===== Display Text / Video Results =====
const showTextResult = async (req, res) => {
  const report = await Report.findById(req.params.reportId);
  if (!report) {
    req.flash("error", "Report not found");
    return res.redirect("/ai-report");
  }
  res.render("reports/textResult", { report });
};

const showVideoResult = async (req, res) => {
  const report = await Report.findById(req.params.reportId);
  if (!report) {
    req.flash("error", "Report not found");
    return res.redirect("/ai-report");
  }
  res.render("reports/videoResult", { report });
};

// ===== TTS =====
const generateTTS = async (req, res) => {
  const report = await Report.findById(req.params.reportId);
  if (!report) return res.status(404).send("Report not found");

  try {
    await tts(report.summaryText, report._id);
    res.send(`/uploads/audio/${report._id}.mp3`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating speech");
  }
};

// ===== Translation =====
const translateSummary = async (req, res) => {
  const report = await Report.findById(req.params.reportId);
  if (!report) return res.status(404).json({ error: "Report not found" });

  const targetLang = req.query.lang || "es";
  try {
    const translatedText = await translateText(report.summaryText, targetLang);
    res.json({ translatedText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ translatedText: report.summaryText });
  }
};

const renderImageForm = async (req, res) => {
  const report = await Report.findById(req.params.reportId);
  if (!report) {
    req.flash("error", "Report not found");
    return res.redirect("/ai-report");
  }
  // Render form without prompt/imageData initially
  res.render("reports/ai-image-form", { report, prompt: null, imageData: null });
};


// ===== AI Image Generation (temporary, no disk save) =====
const generateAIImage = async (req, res) => {
  const { reportId } = req.params;
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    req.flash("error", "Please enter a prompt.");
    return res.redirect(`/ai-report/image/${reportId}`);
  }

  try {
    const response = await axios.post(
      process.env.WORKER_URL,
      { prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.WORKER_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
        timeout: 120000,
      }
    );

    const mime = response.headers["content-type"];
    const base64 = Buffer.from(response.data, "binary").toString("base64");
    const imageData = `data:${mime};base64,${base64}`;

    const report = await Report.findById(reportId);
    res.render("reports/ai-image-result", { report, prompt, imageData });
  } catch (err) {
    console.error("Worker API Error:", err.response?.data || err.message);
    req.flash("error", "Failed to generate AI image via Worker.");
    res.redirect(`/ai-report/text-result/${reportId}`);
  }
};

// ===== Export all functions =====
module.exports = {
  showUploadForm,
  handleTextPreview,
  showTextResult,
  showVideoResult,
  generateTTS,
  translateSummary,
  renderImageForm,
  generateAIImage
};
