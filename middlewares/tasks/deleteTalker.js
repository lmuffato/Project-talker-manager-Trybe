const myModule = require('../../modules');

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST = 404;
const FILE_NAME = 'talker.json';

module.exports = async (req, res, _next) => {
  const data = await myModule.readFileAsync(FILE_NAME);
  const { id } = req.params;
  const talkerIndex = data.findIndex((talker) => talker.id === Number(id));
  if (talkerIndex === -1) {
    return res.status(HTTP_BAD_REQUEST).send();
  }
  data.splice(talkerIndex, 1);
  await myModule.writeFileAsync(FILE_NAME, JSON.stringify(data));
  return res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
};