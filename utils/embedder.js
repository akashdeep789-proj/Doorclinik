const axios = require("axios");

async function generateEmbedding(text) {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2",
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data && Array.isArray(response.data) && response.data[0]?.embedding) {
      return response.data[0].embedding;
    } else {
      console.warn("No embedding returned for text chunk");
      return null;
    }
  } catch (err) {
    console.error("Embedding error:", err.response?.data || err.message);
    return null;
  }
}

module.exports = { generateEmbedding };
