const fs = require('fs').promises;
const talker = require('../talker.json');
const { HTTP_OK_STATUS } = require('../utils/statusHttp');

const fetchTalker = async (_req, res) => {
  const data = await fs.readFile(talker, 'utf-8');
  const fetchData = await JSON.parse(data);

  res.status(HTTP_OK_STATUS).json(fetchData);
};

module.exports = {
  fetchTalker,
};