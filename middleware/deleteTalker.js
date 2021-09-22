const fs = require('fs');

const deleteTalker = (req, res, _next) => {
  const talkers = JSON.parse(fs.readFileSync('talker.json'));
  const id = Number(req.params.id);
  const newTalkers = talkers.filter((talker) => talker.id !== id);
  fs.writeFileSync('talker.json', JSON.stringify(newTalkers));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
