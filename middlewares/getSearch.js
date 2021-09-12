const fs = require('fs');

const getSearch = (req, res, next) => {
  const { query } = req.query;

  if (!query) {
    return next();
  }

  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const filtered = talkers.filter((talker) => talker.name.includes(query));
  return res.status(200).json(filtered);
};

module.exports = getSearch;
