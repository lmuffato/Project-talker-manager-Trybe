const fs = require('fs').promises;

const TALKERS = 'talker.json';

const readFiles = async () => {
  const palestrantes = await fs.readFile(TALKERS, 'utf-8');
  const xxx = JSON.parse(palestrantes);
  console.log(palestrantes);
  console.log(xxx);
  return xxx;
};

module.exports = {
  readFiles,
};