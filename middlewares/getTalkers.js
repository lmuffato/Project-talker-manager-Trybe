const fs = require('fs').promises;

const getTalkers = async (_req, res) => {
  try {
  const data = await fs.readFile('./talker.json', 'utf-8');
  const talkers = JSON.parse(data);
  res.status(200).json(talkers);
  } catch (e) {
  console.log(e);
  }
};

module.exports = getTalkers;
