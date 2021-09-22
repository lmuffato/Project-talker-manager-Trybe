const readFile = require('./models/utils');

const HTTP_OK_STATUS = 200;

const searchTalker = async (req, res) => {
  const { q } = req.query;
  const talker = await readFile.readFileTalker();
  const searchedTalker = talker.filter((talke) => talke.name.includes(q));
  return res.status(HTTP_OK_STATUS).json(searchedTalker);
};

module.exports = {
  searchTalker,
};
