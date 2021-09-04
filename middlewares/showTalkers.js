const getTalkers = require('../utils/getTalkers');
const { HTTP_OK_STATUS } = require('../utils/statusHttp');

const showTalkers = async (_req, res) => {
  const talkers = await getTalkers();
  return res.status(HTTP_OK_STATUS).json(talkers);
};

module.exports = showTalkers;
