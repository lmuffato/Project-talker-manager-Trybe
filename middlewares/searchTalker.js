const fs = require('fs').promises;

const searchTalker = async (req, res) => {
  const { q } = req.query;

  const data = await fs.readFile('./talker.json', 'utf-8');
  const talkers = JSON.parse(data);

  const findTalker = talkers.filter(({ name }) => name.includes(q));

  res.status(200).json(findTalker);
};

module.exports = searchTalker;
