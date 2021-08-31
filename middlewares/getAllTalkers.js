const fs = require('fs');

const getAllTalkers = (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('talker.json'));
  res.status(200).json(talkers);
  if (!talkers.length) return res.status(200).json([]);
  res.status(200).json(talkers);
};

module.exports = getAllTalkers;