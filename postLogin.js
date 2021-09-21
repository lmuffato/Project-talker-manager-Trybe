// Solução encontrada com participação de Eduardo Costa - Turma 10-A
const crypto = require('crypto');
const readFile = require('./models/utils');

// const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_CREATED_STATUS = 201;
const HTTP_UNAUTHORIZED_STATUS = 401;

const lengthAuthorization = 16;

// const HTTP_OK_STATUS = 200;

const cryptoGenerate = (req, res) => {
  const cryptoToken = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ cryptoToken });
};

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

const authorizationToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token não encontrado' });
  }
  if (authorizationToken.length !== lengthAuthorization) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = {
  created,
  authorizationToken,
  cryptoGenerate,
};
