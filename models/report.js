const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  filePath: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "done", "error"],
    default: "pending",
  },
  summaryText: {
    type: String,
    default: "",
  },
  videoUrl: {
    type: String,
    default: "",
  },
  errorMessage: {
    type: String,
    default: "",
  },
}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);
