const fs = require('fs').promises;

const readFile = () => fs.readFile('./talker.json', 'utf-8').then((data) => JSON.parse(data));

const getTalkersID = async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const talkerName = talkers.find((name) => name.id === parseInt(id, 10));
  if (!talkerName) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talkerName);
};

module.exports = getTalkersID;