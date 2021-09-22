const fs = require('fs');

const getAllTalkers = (_req, res) => {
  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  if (!talkers.length) {
    return res.status(200).json([]);
  }
  res.status(200).json(talkers);
};

module.exports = getAllTalkers;
