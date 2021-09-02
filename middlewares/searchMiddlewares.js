const { readFile } = require('../promisesFs');

const HTTP_OK_STATUS = 200;

const searchMiddlewares = async (req, res) => {
  const talkersList = await readFile();
  const { q } = req.query;
  if (!q) {
    return res.status(HTTP_OK_STATUS).json(talkersList);
  }
   const searchTalkersList = talkersList.filter(({ name }) => name.includes(q));
   return res.status(HTTP_OK_STATUS).json(searchTalkersList);
};

module.exports = searchMiddlewares;
