const fs = require('fs').promises;
const { HTTP_OK_STATUS } = require('../utils/statusHttp');

const searchByName = async (req, res) => {
  const { query } = req.params;

  const data = JSON.parse(await fs.readFile('./talker.json'));
  const findTalkers = data.filter((talker) => talker.name.includes(query));

  if (query) {
    return res.status(HTTP_OK_STATUS).json(findTalkers);
  }
  return res.status(HTTP_OK_STATUS).json(data);
};

module.exports = {
  searchByName,
};