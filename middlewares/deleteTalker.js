const { persistFile } = require('../utils/persistFile');

const DELETE_SUCCESSFULL = { message: 'Pessoa palestrante deletada com sucesso' };

const deleteTalker = async (req, res) => {
const { talkers } = req;
const { id } = req.params;

const arrayWithoutMatchedTalker = talkers.filter((talker) => talker.id !== Number(id));

await persistFile(arrayWithoutMatchedTalker);

res.status(200).json(DELETE_SUCCESSFULL);
};

module.exports = { deleteTalker };