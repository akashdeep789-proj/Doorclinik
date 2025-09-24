const fs = require("fs");
const path = require("path");

const UPLOAD_DIR = path.join(__dirname, "../uploads");
const MAX_FILE_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Deletes files older than MAX_FILE_AGE_MS
 */
function cleanupUploads() {
  if (!fs.existsSync(UPLOAD_DIR)) return;

  fs.readdir(UPLOAD_DIR, (err, files) => {
    if (err) return console.error("Cleanup error:", err);

    files.forEach(file => {
      const filePath = path.join(UPLOAD_DIR, file);
      fs.stat(filePath, (err, stats) => {
        if (err) return console.error(err);

        const now = Date.now();
        const fileAge = now - stats.mtimeMs;

        if (fileAge > MAX_FILE_AGE_MS) {
          fs.unlink(filePath, err => {
            if (err) console.error("Failed to delete file:", filePath, err);
            else console.log("Deleted old upload:", filePath);
          });
        }
      });
    });
  });
}

module.exports = cleanupUploads;
