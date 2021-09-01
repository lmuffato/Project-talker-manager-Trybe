const getTalkers = require('../../fs-utils/getTalkers');

const HTTP_OK_STATUS = 200;

const showTalkers = async (_req, res) => {
  const talkers = await getTalkers();
  return res.status(HTTP_OK_STATUS).json(talkers);
};

module.exports = showTalkers;
