const axios = require("axios");
require("dotenv").config();

async function summarizeText(text) {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6",
      { inputs: text },
      { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
    );
    console.log("Summary:", response.data[0].summary_text);
  } catch (err) {
    console.error("Error summarizing:", err.response?.data || err.message);
  }
}

const sampleText = `Patient has high blood pressure and elevated cholesterol levels.
Doctor recommends lifestyle changes, including diet and exercise,
and may prescribe medication to control blood pressure.`;

summarizeText(sampleText);
