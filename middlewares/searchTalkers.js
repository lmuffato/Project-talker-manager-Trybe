const { readFile } = require('fs').promises;

const searchTalkers = async (req, res) => {
  const { q } = req.query;
  const talkers = JSON.parse(await readFile('talker.json', 'utf-8'));
  const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));
  return res.status(200).json(filteredTalkers);
};

module.exports = searchTalkers;