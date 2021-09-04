const getTalkers = require('../utils/getTalkers');
const { HTTP_OK_STATUS, NOT_FOUND } = require('../utils/statusHttp');

const getTalkerById = async (req, res) => {
  const talkers = await getTalkers();
  const chosenTalkerId = Number(req.params.id);
  const chosenTalker = talkers.find(({ id }) => id === chosenTalkerId);

  if (!chosenTalker) {
    return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(HTTP_OK_STATUS).json(chosenTalker);
};

module.exports = getTalkerById;