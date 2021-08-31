const readFile = require('./readFile');

const getTalkerById = async (req, res) => {
  const talkerList = await readFile();
  const talker = talkerList.find(({ id }) => id === parseInt(req.params.id, 10));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
};

module.exports = getTalkerById;