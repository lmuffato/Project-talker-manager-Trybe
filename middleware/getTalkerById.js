const fs = require('fs');

const getTalkerById = (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  const findTalkerById = talkers.find((talker) => talker.id === +id);
  if (findTalkerById) {
    return res.status(200).json(findTalkerById);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};

module.exports = getTalkerById;
