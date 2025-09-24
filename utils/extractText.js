const fs = require("fs");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");

/**
 * Extract text from PDF or image file
 * @param {string} filePath - Path to PDF or image
 * @returns {Promise<string>} Extracted text
 */
async function extractTextFromFile(filePath) {
  const ext = filePath.split(".").pop().toLowerCase();

  if (ext === "pdf") {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    return pdfData.text;
  } else if (["png", "jpg", "jpeg"].includes(ext)) {
    // Use OCR for images
    const { data: { text } } = await Tesseract.recognize(filePath, "eng");
    return text;
  } else {
    throw new Error("Unsupported file type: " + ext);
  }
}

module.exports = extractTextFromFile;
