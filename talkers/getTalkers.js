const fs = require('fs').promises;

const { StatusCodes } = require('http-status-codes');

// cria endpoint /talker

module.exports = async (_req, res) => {
    try {
    const talker = await fs.readFile('./talker.json', 'utf8');
    const result = await JSON.parse(talker);
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.error(err);
  }
  };