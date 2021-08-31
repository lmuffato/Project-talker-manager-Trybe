const fs = require('fs').promises;

const readFile = () => fs.readFile('./talker.json', 'utf-8').then((data) => JSON.parse(data));

const getTalkersId = async (req, res) => {
  const { id } = req.params;
  const talkersList = await readFile();
  const talker = await talkersList.find((talk) => talk.id === parseInt(id, 10));
// parseInt reference: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt.

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talker);
};

module.exports = getTalkersId;
