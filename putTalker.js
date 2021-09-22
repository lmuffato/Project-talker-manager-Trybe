const readFile = require('./models/utils');

const HTTP_OK_STATUS = 200;

const editTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const actualTalkers = await readFile.readFileTalker();
  const changeTalker = {
    name,
    age,
    talk,
    id: Number(id),
  };
  const filterTalker = actualTalkers.filter((talker) => talker.id === id);
  filterTalker.push(changeTalker);
  await readFile.writeFileTalker(filterTalker);
  return res.status(HTTP_OK_STATUS).json(changeTalker);
};

module.exports = {
  editTalker,
};
