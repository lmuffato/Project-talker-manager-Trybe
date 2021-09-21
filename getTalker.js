// Solução encontrada com ajuda do Eduardo Costa - Turma 10-A
const readFile = require('./models/utils');

const HTTP_OK_STATUS = 200;

const getTalkers = async (req, res) => {
  const talkers = await readFile.readFileTalker();

  if (talkers === []) return res.status(200).json([]);

  res.status(HTTP_OK_STATUS).json(talkers);
};

module.exports = getTalkers;
