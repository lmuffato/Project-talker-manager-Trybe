const fs = require('fs').promises;

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
    res.status(200).json(allTalkersList);
  } catch (e) { console.log(e);/* res.status(500).json({ message: e.message }); */ }
};

const getSearch = async (req, res) => {
  try {
    const { query } = req.query;
    console.log(query);
    const alltalkers = await readingFile();
    if (!query || query === '') return res.status(200).json(alltalkers);
    const filtredTalkers = alltalkers.filter((talk) => talk.name.includes(query));
    if (!filtredTalkers) return res.status(200).json([]);
    res.status(200).json(filtredTalkers);  
  } catch (e) /* { res.status(500).json({ message: e.message }); } */ {
    console.log(e);
  }
};

const getTalkerById = async (req, res) => {
  try {
    const { id } = req.params;
    const allTalkers = await readingFile();
    const talkerById = allTalkers.find((talk) => talk.id === parseInt(id, 10));
    if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(talkerById);
  } catch (e) { res.status(500).json({ message: e.message }); }
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
      res.status(201).json(newTalker);
  } catch (e) { res.status(500).json({ message: e.message }); }
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
    return res.status(200).json(editingTalker); 
  } catch (e) { res.status(500).json({ message: e.message }); }
};

const deleteTalker = async (req, res) => {
  try {
    const { id } = req.params;
    const talkersData = await readingFile();
    const attTalker = talkersData.filter((talk) => talk.id !== Number(id));
    await fs.writeFile('talker.json', JSON.stringify(attTalker));
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

module.exports = { getAllTalkers, getTalkerById, addTalker, editTalker, deleteTalker, getSearch };
