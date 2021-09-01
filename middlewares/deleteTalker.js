const fs = require('fs');

const deleteTalker = (req, res) => {
  const { id } = req.params;

  const talker = JSON.parse(fs.readFileSync('./talker.json', 'UTF-8'));
  const index = talker.findIndex((item) => item.id === +id);
  talker.splice(index, 1);

  fs.writeFileSync('./talker.json', JSON.stringify(talker), 'UTF-8');

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;