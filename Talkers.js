const fs = require('fs').promises;

const STATUS_OK = 200;
const STATUS_OK_ADD = 201;
const STATUS_ERRO = 500;
const STATUS_NOT_FOUND = 404;

async function readingFile() {
  const theFile = 'talker.json';
  try {
    const talkersData = await fs.readFile(theFile, 'utf8');
    return JSON.parse(talkersData);
  } catch (error) { console.log(error); }
}

const getAllTalkers = async (_req, res) => {
  try {
    const allTalkersList = await readingFile();
    res.status(STATUS_OK).json(allTalkersList);
  } catch (e) { res.status(STATUS_ERRO).json({ message: e.message }); }
};

const getSearch = async (req, res) => {
  try {
    const { query } = req.query;
    console.log(query);
    const alltalkers = await readingFile();
    if (!query || query === '') return res.status(STATUS_OK).json(alltalkers);
    const filtredTalkers = alltalkers.filter((talk) => talk.name.includes(query));
    if (!filtredTalkers) return res.status(STATUS_OK).json([]);
    res.status(STATUS_OK).json(filtredTalkers);  
  } catch (e) { res.status(STATUS_ERRO).json({ message: e.message }); }
};

const getTalkerById = async (req, res) => {
  try {
    const { id } = req.params;
    const allTalkers = await readingFile();
    const talkerById = allTalkers.find((talk) => talk.id === parseInt(id, 10));
    if (!talkerById) { 
      return res.status(STATUS_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(STATUS_OK).json(talkerById);
  } catch (e) { res.status(STATUS_ERRO).json({ message: e.message }); }
};

const addTalker = async (req, res) => {
  try {
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
      res.status(STATUS_OK_ADD).json(newTalker);
  } catch (e) { res.status(STATUS_ERRO).json({ message: e.message }); }
};

const editTalker = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const editingTalker = {
      id: Number(id),
      name,
      age,
      talk,
    };
    const previousTalkers = await readingFile();
    const otherTalkers = previousTalkers.filter((t) => Number(t.id) !== Number(id));
    otherTalkers.push(editingTalker);
    await fs.writeFile('talker.json', JSON.stringify(otherTalkers));
    return res.status(STATUS_OK).json(editingTalker); 
  } catch (e) { res.status(STATUS_ERRO).json({ message: e.message }); }
};

const deleteTalker = async (req, res) => {
  try {
    const { id } = req.params;
    const talkersData = await readingFile();
    const attTalker = talkersData.filter((talk) => talk.id !== Number(id));
    await fs.writeFile('talker.json', JSON.stringify(attTalker));
    res.status(STATUS_OK).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (e) { res.status(STATUS_ERRO).json({ message: e.message }); }
};

module.exports = { getAllTalkers, getTalkerById, addTalker, editTalker, deleteTalker, getSearch };
