const fs = require('fs').promises;

module.exports = async (_request, response) => {
  const talkers = await fs.readFile('./talker.json');
  const result = await JSON.parse(talkers);
  response.status(200).json(result);
};
