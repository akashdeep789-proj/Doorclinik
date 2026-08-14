const axios = require("axios");
const FaqEmbedding = require("../models/FaqEmbedding");
const { generateEmbedding } = require("../utils/embedder");
const { cosineSimilarity } = require("../utils/cosine"); // reuse your existing cosine function

const CHAT_MODEL = "meta-llama/Llama-3.1-8B-Instruct:fastest";

module.exports.handleChatQuery = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required." });
    }

    // 1. Embed the user's question
    const questionEmbedding = await generateEmbedding(message);
    if (!questionEmbedding) {
      return res.status(500).json({ error: "Could not process your question right now." });
    }

    // 2. Retrieve top matching FAQ entries via cosine similarity
    const allFaqs = await FaqEmbedding.find({});
    const scored = allFaqs
      .map((faq) => ({
        content: faq.content,
        score: cosineSimilarity(faq.embedding, questionEmbedding),
      }))
      .sort((a, b) => b.score - a.score);

    const topContext = scored.slice(0, 3).map((s) => s.content).join("\n\n");

    // 3. Build a grounded, scoped prompt
    const systemPrompt = `You are Doorclinik's assistant. Answer ONLY using the context below.
If the answer isn't in the context, say you don't have that information and suggest the user browse the site or contact support.
Never diagnose medical conditions, prescribe treatment, or give specific medical advice — only suggest which type of specialist might be relevant, and always recommend booking an appointment for anything medical.

Context:
${topContext}`;

    // 4. Call Hugging Face's chat completions endpoint
    const response = await axios.post(
      "https://router.huggingface.co/v1/chat/completions",
      {
        model: CHAT_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        max_tokens: 250,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply =
      response.data?.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response right now.";

    res.json({ reply });
  } catch (err) {
    console.error("Chatbot error:", err.response?.data || err.message);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};