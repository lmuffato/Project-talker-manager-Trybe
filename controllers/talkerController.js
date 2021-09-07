const rescue = require('express-rescue');
const fs = require('fs').promises;

const lerArquivo = async () => {
  const file = await fs.readFile('./talker.json');
  return JSON.parse(file);
};

const talkerRoute = rescue(async (req, res) => {
  const talkers = await lerArquivo();
  if (!talkers) {
    res.status(200).json([]);
  }
  res.status(200).json(talkers);
});

const searchID = rescue(async (req, res) => {
  const { id } = req.params;
  const getIdParams = await lerArquivo();

  const findId = getIdParams.find((f) => f.id === +id);
  if (!findId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(findId);
});

module.exports = { talkerRoute, searchID };
