const rescue = require('express-rescue');
const fs = require('fs').promises;

const lerArquivo = async () => {
  const file = await fs.readFile('./talker.json');
  return JSON.parse(file);
};

exports.talkerRoute = rescue(async (req, res) => {
  const talkers = await lerArquivo();
  if (!talkers) {
    res.status(200).json([]);
  }
  res.status(200).json(talkers);
});
