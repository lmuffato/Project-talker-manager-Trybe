const readFile = require('./models/utils');

const HTTP_OK_STATUS = 200;

const delTalker = async (req, res) => {
  const { id } = req.params;
  const actualTalkers = await readFile.readFileTalker();
  const findTalker = actualTalkers.find((talker) => talker.id === Number(id));
  await readFile.writeFileTalker(findTalker);
  return res.status(HTTP_OK_STATUS)
    .json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = {
  delTalker,
};
