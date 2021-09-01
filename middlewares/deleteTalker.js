const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'talker.json');
/* Source: https://github.com/tryber/sd-09-project-talker-manager/tree/luizfrodrigues-project-talker-manager */
const deleteTalker = (req, res, _next) => {
  const talkers = JSON.parse(fs.readFileSync('talker.json'));
  const id = Number(req.params.id);
  const newTalkers = talkers.filter((t) => t.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(newTalkers));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;