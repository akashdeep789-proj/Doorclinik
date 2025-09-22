require('dotenv').config();
const axios = require('axios');

async function summarizeText(text) {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf",
      { inputs: `Summarize this in simple language for patients:\n\n${text}` },
      { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
    );

    console.log("Summary:", response.data[0].generated_text);
    return response.data[0].generated_text;
  } catch (err) {
    console.error("Error summarizing:", err.response?.data || err.message);
  }
}

// Test with sample medical text
const sampleText = `
Patient has high blood pressure and elevated cholesterol levels.
Doctor recommends lifestyle changes, including diet and exercise,
and may prescribe medication to control blood pressure.
`;

summarizeText(sampleText);
