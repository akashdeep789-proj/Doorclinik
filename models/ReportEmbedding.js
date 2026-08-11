const mongoose = require("mongoose");

const reportEmbeddingSchema = new mongoose.Schema({
  reportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Report",
    required: true,
  },
  chunk: {
    type: String,
    required: true,
  },
  embedding: {
    type: [Number], // store vector embeddings
    required: true,
  },
});

module.exports = mongoose.model("ReportEmbedding", reportEmbeddingSchema);
