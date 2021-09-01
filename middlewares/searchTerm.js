const fs = require('fs');

const searchTerm = (req, res) => {
  const { q } = req.query;

  const talker = JSON.parse(fs.readFileSync('./talker.json', 'UTF-8'));

  const newTalker = talker.filter((t) => t.name.match(q));

  res.status(200).json(newTalker);
};

module.exports = searchTerm;