const fs = require('fs').promises;

const STATUS = require('../status/http_status');

const getAllTalker = async (_req, res) => {
  const talker = (await fs.readFile('./talker.json')).toString('utf-8');
  res.status(STATUS.SUCCESS.OK).send(talker);
};

module.exports = {
    getAllTalker,
};