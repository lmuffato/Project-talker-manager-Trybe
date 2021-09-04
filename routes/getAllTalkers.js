const getAllTalkers = require('../utils/getAllTalkers');
const { HTTP_OK_STATUS } = require('../utils/httpStatus');

const getTalkers = async (_req, res) => {
  const talkers = await getAllTalkers();
  res.status(HTTP_OK_STATUS).json(talkers);
};

module.exports = getTalkers;
