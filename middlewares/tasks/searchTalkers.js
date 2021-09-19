const myModule = require('../../modules');

const HTTP_OK_STATUS = 200;
const FILE_NAME = 'talker.json';

module.exports = async (req, res, _next) => {
  const data = await myModule.readFileAsync(FILE_NAME);
  const { q } = req.query;
  const queryResult = data.filter((talker) => talker.name.includes(q));
  if (!q || q === '') {
    return res.status(HTTP_OK_STATUS).json(data);
  }
  if (!queryResult) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  res.status(HTTP_OK_STATUS).json(queryResult);
};
