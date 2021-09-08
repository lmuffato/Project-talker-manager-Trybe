const fs = require('fs').promises;

const readFile = async () => {
  const data = await fs.readFile('./talker.json', 'utf-8');
  const talkers = await JSON.parse(data);
  return talkers;
};

const searchTalkerByname = async (req, res) => {
  const { q } = req.query;
  const talkers = await readFile();
  const filterTalkers = talkers.filter((talker) => talker.name.includes(q));

  if (!q || q === '') return res.status(200).json(talkers);

  res.status(200).json(filterTalkers);
};

module.exports = searchTalkerByname;
