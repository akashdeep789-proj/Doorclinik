const fs = require("fs");
const path = require("path");
const googleTTS = require("google-tts-api"); // install: npm i google-tts-api
const fetch = require("node-fetch");

// Function: generate TTS audio from text
async function generateTTS(text, reportId, lang = "en") {
  try {
    // Create folder if missing
    const audioDir = path.join(__dirname, "../uploads/audio");
    if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });

    // Generate TTS URL
    const url = googleTTS.getAudioUrl(text, {
      lang,
      slow: false,
      host: "https://translate.google.com",
    });

    // Download MP3
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const audioPath = path.join(audioDir, `${reportId}.mp3`);
    fs.writeFileSync(audioPath, Buffer.from(buffer));

    return audioPath; // path to serve in frontend
  } catch (err) {
    console.error("TTS Error:", err);
    throw err;
  }
}

module.exports = generateTTS;
