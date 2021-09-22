const readFile = require('./models/utils');

const HTTP_CREATED_STATUS = 201;
const HTTP_UNAUTHORIZED_STATUS = 401;

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
  if (authorizationToken.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = {
  createdTalker,
  authorizationToken,
};
