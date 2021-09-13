const fs = require('fs').promises;

const dataFile = './talker.json';

const getAllTalkers = async (_request, response) => {
  const talkers = await fs.readFile(dataFile);
  const parsedTalkers = JSON.parse(talkers);
  response.status(200).json(parsedTalkers);
};

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(dataFile);
  const parsedTalkers = JSON.parse(talkers);
  
  const talker = parsedTalkers.find((t) => t.id === parseInt(id, 10));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
};

const addTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await fs.readFile(dataFile);
  const parsedTalkers = JSON.parse(talkers);

  const newTalker = {
      name,
      age,
      talk,
      id: parsedTalkers.length + 1,
    };

  parsedTalkers.push(newTalker);
  await fs.writeFile('talker.json', JSON.stringify(parsedTalkers));
  if (!newTalker) return res.status(400).json({ message: 'Palestrante não cadastrado' });
  res.status(201).json(newTalker);
};

const editTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const editingTalker = { id: Number(id), name, age, talk };

  const talkers = await fs.readFile(dataFile);
  const parsedTalkers = JSON.parse(talkers);

  const preEditedTalkers = parsedTalkers.filter((t) => Number(t.id) !== Number(id));
  preEditedTalkers.push(editingTalker);
  await fs.writeFile('talker.json', JSON.stringify(preEditedTalkers));
  if (!editingTalker) { 
    return res.status(400)
    .json({ message: 'Palestrante não atualizado' });
  }
    res.status(200).json(editingTalker); 
  };

  const deleteTalker = async (req, res) => {
    const { id } = req.params;
    const talkers = await fs.readFile(dataFile);
    const parsedTalkers = JSON.parse(talkers);

    const attTalker = parsedTalkers.filter((talk) => talk.id !== Number(id));
    await fs.writeFile('talker.json', JSON.stringify(attTalker));
    if (!attTalker) { 
      return res.status(400)
      .json({ message: 'Palestrante não deletado' });
    }
      res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
     };

module.exports = { getAllTalkers, getTalkerById, addTalker, editTalker, deleteTalker };
