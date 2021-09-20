// Solução encontrada com ajuda do Eduardo Costa - Turma 10-A
const { readFile } = require('fs').promises;

const HTTP_OK_STATUS = 200;

const readFileTalker = () => readFile('./talker.json', 'utf-8')
  .then((data) => JSON.parse(data));

const getTalkers = async (req, res) => {
  const talkers = await readFileTalker();

  if (talkers === []) return res.status(200).json([]);

  res.status(HTTP_OK_STATUS).json(talkers);
};

module.exports = getTalkers;
