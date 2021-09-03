const fs = require('fs').promises;

const deleteTalker = async (req, res) => {
  const { id } = req.params;

  const data = await fs.readFile('./talker.json', 'utf-8');
  const talkers = JSON.parse(data);

  const selectDeletedTalker = talkers.filter((talker) => +talker.id !== +id);

  await fs.writeFile('talker.json', JSON.stringify(selectDeletedTalker));

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
