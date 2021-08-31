const HTTP_OK_STATUS = 200;
const fs = require('fs').promises;

const getTalkerSearch = async (req, res) => {
  const query = req.query.q;
  const data = await fs.readFile('talker.json', 'utf8').then((e) => JSON.parse(e));
  const talker = data.filter((e) => e.name.includes(query));

  return res.status(HTTP_OK_STATUS).json(talker);
};

module.exports = getTalkerSearch;
