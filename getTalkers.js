const fs = require('fs').promises;

/* function readingFile() {
  const theFile = 'talker.json';
  return fs.readFile(theFile, 'utf8')
  .then((data) => JSON.parse(data));
} */

async function readingFile() {
  const theFile = 'talker.json';
  let talkersData;
  try {
    talkersData = await fs.readFile(theFile, 'utf8')
    .then((data) => JSON.parse(data));
} catch (error) { console.log(error); }
  return talkersData;
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

// só pra né

const addTalker = async (req, res) => {
console.log('cheguei aqui na funcao addTalker');
const { name, age, talk } = req.body;
const oldTalkers = await readingFile();
const newTalker = {
  name,
  age,
  talk,
  id: oldTalkers.length + 1,
};
oldTalkers.push(newTalker);
await fs.writeFile('talker.json', JSON.stringify(oldTalkers));
  res.status(200).json(newTalker);
};

module.exports = { getAllTalkers, getTalkerById, addTalker };

// referência parseInt : https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt
