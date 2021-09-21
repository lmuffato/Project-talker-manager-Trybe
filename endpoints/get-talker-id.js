const manageTalkers = require('../utils/manageTalkers');
const { OK, NOT_FOUND } = require('../utils/status');

const getTalkerById = async (req, res) => {
  const { id } = req.params;

  const getTalkers = await manageTalkers();

  const soughtTalker = getTalkers.find((talker) => talker.id === parseInt(id, 10));

  if (soughtTalker) return res.status(OK).json(soughtTalker);

  return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
};

module.exports = getTalkerById;