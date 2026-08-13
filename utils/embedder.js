const axios = require("axios");

async function generateEmbedding(text) {
  try {
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction",
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    // New endpoint returns a flat array of numbers for a single input,
    // but handle a nested array shape too, just in case.
    if (Array.isArray(data) && typeof data[0] === "number") {
      return data;
    }
    if (Array.isArray(data) && Array.isArray(data[0])) {
      return data[0];
    }

    console.warn("Unexpected embedding response shape:", data);
    return null;
  } catch (err) {
    console.error("Embedding error:", err.response?.data || err.message);
    return null;
  }
}

module.exports = { generateEmbedding };