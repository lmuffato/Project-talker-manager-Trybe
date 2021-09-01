const fs = require('fs').promises;

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  try {
  const data = await fs.readFile('./talker.json', 'utf-8');
  const talkers = JSON.parse(data);
  const talker = talkers.find((t) => t.id === parseInt(id, 0));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
  } catch (e) {
  console.log(e);
  }
};

module.exports = getTalkerById;
