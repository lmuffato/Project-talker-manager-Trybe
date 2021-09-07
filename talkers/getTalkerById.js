const fs = require('fs').promises;
const { StatusCodes } = require('http-status-codes');

// cria endpoint /talker/id que retorna o palestrante pelo id
 module.exports = async (request, response) => {
  const { id } = request.params;
  const talker = await fs.readFile('./talker.json', 'utf-8');
  const result = await JSON.parse(talker);
  const speaker = result.find((obj) => obj.id === parseInt(id, 0));
  if (!speaker) {
    return response.status(StatusCodes.NOT_FOUND).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  response.status(StatusCodes.OK).json(speaker);
};