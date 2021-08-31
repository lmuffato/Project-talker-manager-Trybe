const fs = require('fs');

const getTalkerById = (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('talker.json'));
  const id = Number(req.params.id);
  const talker = talkers.find((tal) => tal.id === id);
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talker);
};

module.exports = getTalkerById;