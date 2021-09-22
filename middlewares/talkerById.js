const fs = require('fs').promises;
const { HTTP_OK_STATUS, HTTP_NOT_FOUND } = require('../utils/statusHttp');

const talkerById = async (req, res) => {
  const { id } = req.params;
  
  const data = JSON.parse(await fs.readFile('talker.json'));
  const idTalker = data.find((talker) => talker.id === Number(id));

  if (!idTalker) {
    return res.status(HTTP_NOT_FOUND)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(idTalker);
};

module.exports = {
  talkerById,
};