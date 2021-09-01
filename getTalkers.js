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

/* const addTalker = async (req, res) => {
const { name, age, talk } = req.body;

const oldTalkers = await readingFile();
const newTalker = {
  name, age, talk, id: oldTalkers.lenght + 1,
};

oldTalkers.push(newTalker);
await fs.writeFile('talker.json', JSON.stringfy(oldTalkers));
  res.status(200).json(newTalker);

  // adicionar na exportação o addTalker
}; */

module.exports = { getAllTalkers, getTalkerById };

// referência parseInt : https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt
