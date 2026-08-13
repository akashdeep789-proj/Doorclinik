const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const faqEmbeddingSchema = new Schema({
  faqId: { type: String, required: true, unique: true },
  topic: String,
  content: { type: String, required: true },
  embedding: { type: [Number], required: true },
});

module.exports = mongoose.model("FaqEmbedding", faqEmbeddingSchema);