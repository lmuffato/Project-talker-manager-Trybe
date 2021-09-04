const getAllTalkers = require('../utils/getAllTalkers');
const { HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS } = require('../utils/httpStatus');

const getTalkerById = async (req, res) => {
  const { id } = req.params;

  const getTalkers = await getAllTalkers();

  const soughtTalker = getTalkers.find((talker) => talker.id === parseInt(id, 10));

  if (soughtTalker) return res.status(HTTP_OK_STATUS).json(soughtTalker);

  return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
};

module.exports = getTalkerById;
