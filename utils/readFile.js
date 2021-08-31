const fs = require('fs').promises;

module.exports = async function readFile(filePath) {
  const data = await fs.readFile(filePath);
  return JSON.parse(data);
};
