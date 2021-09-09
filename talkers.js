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

module.exports = { getAllTalkers, getTalkerById };
