// knowledgeBase/embedFaqs.js
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const FaqEmbedding = require("../models/FaqEmbedding");
const { generateEmbedding } = require("../utils/embedder");
const { faqEntries } = require("./faqData");

const dbUrl = process.env.ATLASDB_URL;

async function embedFaqs() {
  await mongoose.connect(dbUrl);
  console.log("Connected to MongoDB Atlas for FAQ embedding");

  for (const entry of faqEntries) {
    const existing = await FaqEmbedding.findOne({ faqId: entry.id });
    if (existing) {
      console.log(`Skipping (already embedded): ${entry.id}`);
      continue;
    }

    const embedding = await generateEmbedding(entry.content);
    if (!embedding) {
      console.warn(`Failed to generate embedding for: ${entry.id}`);
      continue;
    }

    await FaqEmbedding.create({
      faqId: entry.id,
      topic: entry.topic,
      content: entry.content,
      embedding,
    });
    console.log(`Embedded: ${entry.id}`);
  }

  console.log("FAQ embedding complete.");
  await mongoose.disconnect();
}

embedFaqs().catch((err) => {
  console.error("FAQ embedding failed:", err);
  process.exit(1);
});