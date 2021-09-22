// Solução encontrada com participação de Eduardo Costa - Turma 10-A
const readFile = require('./models/utils');

const HTTP_CREATED_STATUS = 201;

const loginValidate = async (req, res) => {
  const { email, password } = req.body;
  const create = await readFile.readFileTalker();
  const newUser = {
    email,
    password,
  };
  create.push(newUser);
  await readFile.writeFileTalker(create);
  res.status(HTTP_CREATED_STATUS).json(newUser);
};

module.exports = {
  loginValidate,
};
