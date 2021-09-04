const getTalkers = require('../utils/getTalkers');
const { HTTP_OK_STATUS } = require('../utils/statusHttp');

const searchTalker = async (req, res) => {
  const talkersList = await getTalkers();
  const { q } = req.query;
  if (!q) {
    return res.status(HTTP_OK_STATUS).json(talkersList);
  }
  talkersList.filter(({ name }) => name.includes(q));
  return res.status(HTTP_OK_STATUS).json(talkersList);
};

module.exports = searchTalker;