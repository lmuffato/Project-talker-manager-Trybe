const fs = require('fs').promises;

module.exports = async (req, res) => {
  const { id } = req.params;

  const talkers = await fs.readFile('./talker.json', 'utf8');

  const talkerList = JSON.parse(talkers);

  const filtered = talkerList.filter((talker) => talker.id === id);

  await fs.writeFile('./talker.json', JSON.stringify(filtered), 'utf8');

  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};
