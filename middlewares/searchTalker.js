const rescue = require('express-rescue');
const fs = require('fs').promises;

const searchTalker = rescue(async (req, res) => {
  const { q } = req.query;

  const talkers = await fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));

  if (q === '' || !q) return res.status(200).json(talkers);

  const filterTalker = talkers.filter((talker) => talker.name.includes(q));

  return res.status(200).json(filterTalker);
});

module.exports = searchTalker;