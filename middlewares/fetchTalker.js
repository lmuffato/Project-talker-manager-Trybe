const fs = require('fs').promises;
const { HTTP_OK_STATUS } = require('../utils/statusHttp');

const fetchTalker = async (_req, res) => {
  const data = await fs.readFile('talker.json');
  
  return res.status(HTTP_OK_STATUS).json(JSON.parse((data)));
};

module.exports = {
  fetchTalker,
};