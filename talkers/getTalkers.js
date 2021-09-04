const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

// cria endpoint /talker
module.exports = async (_request, response) => {
  const talker = await fs.readFile('./talker.json', 'utf8');
  const result = await JSON.parse(talker);
  response.status(HTTP_OK_STATUS).json(result);
};