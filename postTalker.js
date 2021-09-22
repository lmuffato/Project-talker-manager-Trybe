const readFile = require('./models/utils');

const HTTP_CREATED_STATUS = 201;
const HTTP_UNAUTHORIZED_STATUS = 401;
const HTTP_BAD_REQUEST_STATUS = 400;

const createdTalker = async (req, res) => {
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

const authorizationToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
  }
  next();
};

const checkName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

module.exports = {
  createdTalker,
  authorizationToken,
  checkName,
};
