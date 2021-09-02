const fs = require('fs').promises;

const readFile = async () => {
  const data = await fs.readFile('./talker.json', 'utf-8');
  const talkers = await JSON.parse(data);
  return talkers;
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();

  const filterTalker = talkers.filter((talker) => talker.id !== Number(id));
  const allTalkers = [...filterTalker];
  await fs.writeFile('./talker.json', JSON.stringify(allTalkers));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
