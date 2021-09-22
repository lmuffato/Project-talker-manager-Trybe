const fs = require('fs').promises;
const { HTTP_OK_STATUS } = require('../utils/statusHttp');

const talkerDelete = async (req, res) => {
  const { id } = req.params;

  const data = JSON.parse(await fs.readFile('talker.json'));
  const deleteIndex = data.findIndex((talker) => talker.id === Number(id));
  
  data.splice(deleteIndex);
  await fs.writeFile('./talker.json', JSON.stringify(data));

  res.status(HTTP_OK_STATUS).send({
    message: 'Pessoa palestrante deletada com sucesso',
  });
};

module.exports = {
  talkerDelete,
};