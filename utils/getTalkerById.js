const { getAllTalkers } = require('../readData');
const { HTTP_OK_STATUS, HTTP_NOT_FOUND } = require('./httpStatus');

const getTalkerById = async (req, res) => {
  const { id } = req.params;

  const getTalkers = await getAllTalkers();

  const soughtTalker = getTalkers.find((talker) => talker.id === parseInt(id, 10));

  if (soughtTalker) return res.status(HTTP_OK_STATUS).json(soughtTalker);

  return res.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
};

module.exports = getTalkerById;

// Foi consultado o código disponibilizado pelo Instrutor Renato:
// https://github.com/tryber/sd-10a-live-lectures/blob/lecture/26.5/app-express/booksRouter.js
