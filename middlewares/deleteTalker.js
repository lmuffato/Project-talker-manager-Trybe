const editTalkers = require('../fs-utils/editTalkers');
const getTalkers = require('../fs-utils/getTalkers');
const { HTTP_OK_STATUS } = require('../fs-utils/statusHttp');

const deleteTalker = async (req, res) => {
  const { id: idDelete } = req.params;
  const talkersList = await getTalkers();
  const newTalkerList = talkersList
    .filter(({ id }) => Number(id) !== Number(idDelete));
  await editTalkers(newTalkerList);
  return res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;