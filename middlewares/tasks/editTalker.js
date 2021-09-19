const myModule = require('../../modules');

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST = 404;
const FILE_NAME = 'talker.json';

module.exports = async (req, res, _next) => {
  const data = await myModule.readFileAsync(FILE_NAME);
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkerIndex = data.findIndex((talker) => talker.id === Number(id));
  const editTalker = { id: Number(id), name, age, talk };

  if (talkerIndex === -1) {
    return res.status(HTTP_BAD_REQUEST).send();
  }

  data[talkerIndex] = editTalker;
  
  await myModule.writeFileAsync(FILE_NAME, JSON.stringify(data));

  return res.status(HTTP_OK_STATUS).json(editTalker);
};
