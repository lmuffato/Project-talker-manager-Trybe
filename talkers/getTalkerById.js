const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;

// cria endpoint /talker/id que retorna o palestrante pelo id
 module.exports = async (request, response) => {
  const { id } = request.params;
  const talker = await fs.readFile('./talker.json', 'utf-8');
  const result = await JSON.parse(talker);
  const speaker = result.find((obj) => obj.id === parseInt(id, 0));
  if (!speaker) {
    return response.status(NOT_FOUND).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  response.status(HTTP_OK_STATUS).json(speaker);
};