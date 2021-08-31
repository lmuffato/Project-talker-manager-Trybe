const fs = require('fs');

const getTalkers = (_req, res) => {
  try {
    const talker = JSON.parse(fs.readFileSync('./talker.json', 'UTF-8'));
    return res.status(200).json(talker);
  } catch (e) {
    return res.status(200).json([]);
  }
};

module.exports = getTalkers;