const fs = require('fs');
const { HTTP_OK_STATUS } = require('../utils/statusHttp');

const fetchTalker = async (_req, res) => {
  const data = fs.readFileSync('talker.json');

  return res.status(HTTP_OK_STATUS).json(JSON.parse(data));
};

module.exports = {
  fetchTalker,
};