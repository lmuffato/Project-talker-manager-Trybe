const fs = require('fs').promises;

const getAllTalkers = async (_request, response) => {
  const talkers = await fs.readFile('./talker.json');
  const parsedTalkers = JSON.parse(talkers);
  response.status(200).json(parsedTalkers);
};

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile('./talker.json');
  const parsedTalkers = JSON.parse(talkers);
  
  const talker = parsedTalkers.find((t) => t.id === parseInt(id, 10));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
};

const addTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await fs.readFile('./talker.json');
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
  res.status(200).json(newTalker);
};

module.exports = { getAllTalkers, getTalkerById, addTalker };
