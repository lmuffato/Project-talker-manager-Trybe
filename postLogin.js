// Solução encontrada com participação de Eduardo Costa - Turma 10-A
const readFile = require('./models/utils');

const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_CREATED_STATUS = 201;

const created = async (req, res) => {
  const { name, age, talk } = req.body;
  const create = await readFile.readFileTalker();
  const newUser = {
    name,
    age,
    id: create.length + 1,
    talk,
  };
  create.push(newUser);
  await readFile.writeFileTalker(create);
  res.status(HTTP_CREATED_STATUS).json(newUser);
};

module.exports = created;
