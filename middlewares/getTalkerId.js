const fs = require('fs').promises;

const readFile = () => fs.readFile('./talker.json', 'utf-8').then((data) => JSON.parse(data));

const getTalkerId = async (req, res) => {
  const { id } = req.params;
  const talkersList = await readFile();
  const talker = talkersList.find((t) => t.id === parseInt(id, 10));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talker);
};

module.exports = getTalkerId;
