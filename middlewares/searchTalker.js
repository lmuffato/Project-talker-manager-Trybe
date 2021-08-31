const { readFile } = require('../fs-util');

const searchTalker = async (req, res) => {
  const talkersList = await readFile();
  const { q } = req.query;
  if (!q) {
    return res.status(200).json(talkersList);
  }
  talkersList.filter(({ name }) => name.includes(q));
  return res.status(200).json(talkersList);
};

module.exports = searchTalker;
