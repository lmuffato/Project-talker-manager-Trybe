const { readFile, writeFile } = require('fs').promises;

const fileTalkers = './talker.json';
const HTTP_OK_STATUS = 200;

const readFileTalker = () => readFile(fileTalkers, 'utf-8')
  .then((data) => JSON.parse(data));

const putTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await readFileTalker();

  const talkerEdit = { name, age, talk, id: Number(id) };
  const talkerFilter = talkers.filter((result) => result.id === Number(id));

  talkerFilter.push(talkerEdit);

  await writeFile(fileTalkers, JSON.stringify(talkerFilter));

  res.status(HTTP_OK_STATUS).json(talkerEdit);
};

module.exports = putTalker;
