const fs = require('fs').promises;

function readingFile() {
  const theFile = 'talker.json';
  return fs.readFile(theFile, 'utf8')
  .then((data) => JSON.parse(data));
}

const getAllTalkers = async (_req, res) => {
  const allTalkersList = await readingFile();
  return res.status(200).json(allTalkersList);
};

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const allTalkers = await readingFile();

  const talkerById = allTalkers.find((talk) => talk.id === parseInt(id, 10));
  if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

res.status(200).json(talkerById);
};

module.exports = { getAllTalkers, getTalkerById };
