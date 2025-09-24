const axios = require("axios");
require("dotenv").config();

/**
 * Summarizes a text using Hugging Face distilbart-cnn-12-6 model
 * @param {string} text - Text to summarize
 * @returns {string} summary text
 */
async function summarizeText(text) {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6",
      { inputs: text },
      { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
    );

    // Hugging Face may return different structures depending on input
    if (Array.isArray(response.data) && response.data[0]?.summary_text) {
      return response.data[0].summary_text;
    } else {
      return "Unable to generate summary for this text.";
    }
  } catch (err) {
    console.error("Error summarizing:", err.response?.data || err.message);
    return "Error generating summary.";
  }
}

module.exports = { summarizeText };
