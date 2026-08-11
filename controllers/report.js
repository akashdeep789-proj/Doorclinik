const Report = require('../models/report');
const ReportEmbedding = require('../models/ReportEmbedding'); // RAG embeddings
const { summarizeText } = require("../utils/hfSummarizer");
const extractTextFromFile = require("../utils/extractText");
const chunkText = require("../utils/chunkText");
const tts = require("../utils/tts");
const translateText = require("../utils/translate");
const { generateEmbedding } = require("../utils/embedder"); // embedding utility
const axios = require("axios");

// ===== Upload Form =====
const showUploadForm = (req, res) => {
  res.render("reports/upload");
};

// ===== Handle Text Upload + Summary + Embeddings =====
const handleTextPreview = async (req, res) => {
  try {
    if (!req.file) {
      req.flash("error", "Please upload a PDF or image file!");
      return res.redirect("/ai-report");
    }

    const text = await extractTextFromFile(req.file.path);
    const chunks = chunkText(text, 1500);
    let finalSummary = "";
    const chunkEmbeddings = [];

    for (const chunk of chunks) {
      try {
        const chunkSummary = await summarizeText(chunk);
        finalSummary += chunkSummary + " ";

        let embedding = null;
        try {
          embedding = await generateEmbedding(chunk);
        } catch (embedErr) {
          console.error("Embedding error for chunk:", embedErr.message);
        }

        if (embedding && Array.isArray(embedding) && embedding.length > 0) {
          chunkEmbeddings.push({ chunk, embedding });
        }
      } catch (chunkErr) {
        console.error("Error processing chunk:", chunkErr.message);
      }
    }

    const newReport = new Report({
      filePath: req.file.path,
      status: "done",
      summaryText: finalSummary.trim(),
      videoUrl: "",
    });
    await newReport.save();

    if (chunkEmbeddings.length > 0) {
      const embeddingDocs = chunkEmbeddings.map((ce) => ({
        reportId: newReport._id,
        chunk: ce.chunk,
        embedding: ce.embedding,
      }));
      await ReportEmbedding.insertMany(embeddingDocs);
    }

    res.redirect(`/ai-report/text-result/${newReport._id}`);
  } catch (err) {
    console.error("Error in handleTextPreview:", err);
    req.flash("error", "Error generating summary or embeddings");
    res.redirect("/ai-report");
  }
};

// ===== Show Summary Page =====
const showTextResult = async (req, res) => {
  try {
    const report = await Report.findById(req.params.reportId);
    if (!report) {
      req.flash("error", "Report not found");
      return res.redirect("/ai-report");
    }
    res.render("reports/textResult", { report });
  } catch (err) {
    console.error(err);
    req.flash("error", "Error fetching report");
    res.redirect("/ai-report");
  }
};

// ===== Show Video Page =====
const showVideoResult = async (req, res) => {
  try {
    const report = await Report.findById(req.params.reportId);
    if (!report) {
      req.flash("error", "Report not found");
      return res.redirect("/ai-report");
    }
    res.render("reports/videoResult", { report });
  } catch (err) {
    console.error(err);
    req.flash("error", "Error fetching report");
    res.redirect("/ai-report");
  }
};

// ===== Text-to-Speech =====
const generateTTS = async (req, res) => {
  try {
    const report = await Report.findById(req.params.reportId);
    if (!report) return res.status(404).send("Report not found");

    await tts(report.summaryText, report._id);
    res.send(`/uploads/audio/${report._id}.mp3`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating speech");
  }
};

// ===== Translate Summary =====
const translateSummary = async (req, res) => {
  try {
    const report = await Report.findById(req.params.reportId);
    if (!report) return res.status(404).json({ error: "Report not found" });

    const targetLang = req.query.lang || "es";
    const translatedText = await translateText(report.summaryText, targetLang);
    res.json({ translatedText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ translatedText: req.report?.summaryText || "" });
  }
};

// ===== Render AI Image Form =====
const renderImageForm = async (req, res) => {
  try {
    const report = await Report.findById(req.params.reportId);
    if (!report) {
      req.flash("error", "Report not found");
      return res.redirect("/ai-report");
    }
    res.render("reports/ai-image-form", { report, prompt: null, imageData: null });
  } catch (err) {
    console.error(err);
    req.flash("error", "Error rendering image form");
    res.redirect("/ai-report");
  }
};

// ===== Generate AI Image =====
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

// ===== Render RAG Query Form =====
const renderQueryForm = async (req, res) => {
  try {
    const report = await Report.findById(req.params.reportId);
    if (!report) return res.redirect("/ai-report");
    res.render("reports/query-form", { report, answer: null, question: null, topChunks: [] });
  } catch (err) {
    console.error(err);
    req.flash("error", "Error rendering query form");
    res.redirect("/ai-report");
  }
};

// ===== Handle RAG Query =====
const handleQuery = async (req, res) => {
  try {
    const { question } = req.body;
    const reportId = req.params.reportId;

    const report = await Report.findById(reportId);
    if (!report) return res.redirect("/ai-report");

    const embeddings = await ReportEmbedding.find({ reportId });
    if (!embeddings || embeddings.length === 0) {
      req.flash("error", "No embeddings found for this report");
      return res.redirect(`/ai-report/query/${reportId}`);
    }

    const questionEmbedding = await generateEmbedding(question);

    // cosine similarity
    const similarity = (vec1, vec2) => {
      const dot = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
      const norm1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
      const norm2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
      return dot / (norm1 * norm2);
    };

    const scoredChunks = embeddings.map(e => ({
      chunk: e.chunk,
      score: similarity(e.embedding, questionEmbedding)
    }));

    scoredChunks.sort((a, b) => b.score - a.score);
    const topChunks = scoredChunks.slice(0, 3); // top 3 chunks

    const context = topChunks.map(c => c.chunk).join("\n");
    const answerPrompt = `Based on the following text:\n"${context}"\nAnswer the question:\n"${question}"`;
    const answer = await summarizeText(answerPrompt);

    res.render("reports/query-form", { report, answer, question, topChunks });
  } catch (err) {
    console.error(err);
    req.flash("error", "Error processing query");
    res.redirect(`/ai-report/query/${req.params.reportId}`);
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
  generateAIImage,
  renderQueryForm,
  handleQuery
};
