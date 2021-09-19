const myModule = require('../../modules');

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST = 404;
const FILE_NAME = 'talker.json';

module.exports = async (req, res, _next) => {
  const data = await myModule.readFileAsync(FILE_NAME);
  const { id } = req.params;
  const getTalker = data.find((talker) => talker.id === Number(id));

  if (!getTalker) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(HTTP_OK_STATUS).send(getTalker);
};
