const fs = require('fs');

const searchTalker = (req, res, _next) => {
  const { q } = req.query;
  const talker = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  if (!q) return res.status(200).json(talker);
  const filterTalk = talker.filter((t) => t.name.includes(q));
  if (!filterTalk) return res.status(200).json(Array.from([]));
  return res.status(200).json(filterTalk);
};
module.exports = searchTalker;
