const fs = require('fs').promises;

const readFileTalker = async (_request, response) => {
  const talkers = await fs.readFile('./talker.json');
  const result = await JSON.parse(talkers);
  response.status(200).json(result);
};

module.exports = {
  readFileTalker,
};
