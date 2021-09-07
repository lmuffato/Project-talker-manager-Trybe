const fs = require('fs').promises;

const { StatusCodes } = require('http-status-codes');

// cria endpoint /talker

try {
  module.exports = async (_request, response) => {
    const talker = await fs.readFile('./talker.json', 'utf8');
    const result = await JSON.parse(talker);
    response.status(StatusCodes.OK).json(result);
  };
} catch (err) {
  console.error(err);
}