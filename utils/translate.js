const axios = require("axios");
require("dotenv").config();

async function translateText(text, targetLang = "es") {
  try {
    // Hugging Face translation model
    const model = "Helsinki-NLP/opus-mt-en-" + targetLang;
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      { inputs: text },
      { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
    );

    // Hugging Face returns an array of objects
    if (response.data && response.data[0] && response.data[0].translation_text) {
      return response.data[0].translation_text;
    } else {
      return text; // fallback
    }
  } catch (err) {
    console.error("Translation Error:", err.response?.data || err.message);
    return text; // fallback to original
  }
}

module.exports = translateText;
