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
  // return res.status(x).json({ message: 'cxxxx'})}
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

const addTalker = async (req, res) => {
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
  res.status(201).json(newTalker);
};

const editTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const editingTalker = {
    id: Number(id),
    name,
    age,
    talk,
  };
  const previousTalkers = await readingFile();
  previousTalkers.filter((t) => Number(t.id) !== Number(id));
  previousTalkers.push(editingTalker);
  await fs.writeFile('talker.json', JSON.stringify(previousTalkers));
  return res.status(200).json(editingTalker);
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const previousTalkers = await readingFile();
  previousTalkers.filter((t) => Number(t.id) !== Number(id));
  await fs.writeFile('talker.json', JSON.stringify(previousTalkers));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = { getAllTalkers, getTalkerById, addTalker, editTalker, deleteTalker };
