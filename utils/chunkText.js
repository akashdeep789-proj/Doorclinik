/**
 * Split long text into chunks of given size
 * @param {string} text - Text to split
 * @param {number} size - Max characters per chunk
 * @returns {string[]} Array of text chunks
 */
function chunkText(text, size = 1500) {
  const chunks = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}

module.exports = chunkText;
