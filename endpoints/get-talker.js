const manageTalkersFile = require('../utils/manageTalkers');

const getTalker = async (_req, res) => {
  const talkers = await manageTalkersFile();
  res.status(200).json(talkers);
};

module.exports = getTalker;
