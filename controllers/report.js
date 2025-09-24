const Report = require('../models/report');
const { summarizeText } = require("../utils/hfSummarizer");
const extractTextFromFile = require("../utils/extractText");
const chunkText = require("../utils/chunkText");
const fs = require("fs");
const path = require("path");
const tts = require("../utils/tts");
const translateText = require("../utils/translate");

// Show upload page
module.exports.showUploadForm = (req, res) => {
  res.render("reports/upload");
};

// Handle upload and generate text summary with chunking
module.exports.handleTextPreview = async (req, res) => {
  try {
    if (!req.file) {
      req.flash("error", "Please upload a PDF or image file!");
      return res.redirect("/ai-report");
    }

    const text = await extractTextFromFile(req.file.path);

    // Chunk long text to avoid Hugging Face errors
    const chunks = chunkText(text, 1500);
    let finalSummary = "";

    for (const chunk of chunks) {
      const chunkSummary = await summarizeText(chunk);
      finalSummary += chunkSummary + " ";
    }

    finalSummary = finalSummary.trim();

    const newReport = new Report({
      filePath: req.file.path,
      status: "done",      // summary generated
      summaryText: finalSummary,
      videoUrl: "",        // video not generated yet
    });
    await newReport.save();

    res.redirect(`/ai-report/text-result/${newReport._id}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Error generating summary");
    res.redirect("/ai-report");
  }
};

// Show text summary page
module.exports.showTextResult = async (req, res) => {
  const report = await Report.findById(req.params.reportId);
  if (!report) {
    req.flash("error", "Report not found");
    return res.redirect("/ai-report");
  }
  res.render("reports/textResult", { report });
};

// Show video (existing)
module.exports.showVideoResult = async (req, res) => {
  const report = await Report.findById(req.params.reportId);
  if (!report) {
    req.flash("error", "Report not found");
    return res.redirect("/ai-report");
  }
  res.render("reports/videoResult", { report });
};

module.exports.generateTTS = async (req, res) => {
  const report = await Report.findById(req.params.reportId);
  if (!report) return res.status(404).send("Report not found");

  try {
    const audioPath = await tts(report.summaryText, report._id);
    // return relative path for frontend
    const relativePath = `/uploads/audio/${report._id}.mp3`;
    res.send(relativePath);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating speech");
  }
};


module.exports.translateSummary = async (req, res) => {
  const report = await Report.findById(req.params.reportId);
  if (!report) return res.status(404).send({ error: "Report not found" });

  const targetLang = req.query.lang || "es";

  try {
    const translatedText = await translateText(report.summaryText, targetLang);
    res.json({ translatedText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ translatedText: report.summaryText });
  }
};

