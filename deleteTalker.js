const { readFile, writeFile } = require('fs').promises;

const fileTalkers = './talker.json';
const HTTP_OK_STATUS = 200;

const readFileTalker = () => readFile(fileTalkers, 'utf-8')
  .then((data) => JSON.parse(data));

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talkers = await readFileTalker();

  const talkerFilter = talkers.find((talker) => talker.id === Number(id));

  await writeFile(fileTalkers, JSON.stringify(talkerFilter));

  res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
