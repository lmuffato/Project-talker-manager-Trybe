const { readFile, writeFile } = require('fs').promises;

const FILE_TALKERS = './talker.json';

const LENGTH_NAME = 3;
const LENGTH_AUTHORIR = 16;
const NUMBER_AGE = 18;

const HTTP_CREATED_STATUS = 201;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;

const readFileTalker = () => readFile(FILE_TALKERS, 'utf-8')
  .then((data) => JSON.parse(data));

const createdTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const createTalker = await readFileTalker();
  const novoTalker = { name, age, id: createTalker.length + 1, talk };
  createTalker.push(novoTalker);
  await writeFile('./talker.json', JSON.stringify(createTalker));
  res.status(HTTP_CREATED_STATUS).json(novoTalker);
};

const tokenAuthorized = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED_STATUS)
      .json({ message: 'Token não encontrado' }); 
  }
  if (authorization.length !== LENGTH_AUTHORIR) {
    return res.status(HTTP_UNAUTHORIZED_STATUS)
      .json({ message: 'Token inválido' });
  }
  next();
};

const nameAuthorized = (req, res, next) => {
  const { name } = req.body;
  if (!name || name.length === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < LENGTH_NAME) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageAuthorized = (req, res, next) => {
  const { age } = req.body;
  if (!age || age.length === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < NUMBER_AGE) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const talkAuthorized = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e' 
      + '"rate" não podem ser vazios' });
  }
  if (!talk.rate && talk.rate !== 0) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e'
      + '"rate" não podem ser vazios' });
  }
  next();
};

const dateAuthorized = (req, res, next) => {
  const { talk } = req.body;
  const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/; // https://www.regextester.com
  if (!regexDate.test(talk.watchedAt)) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa' });
  }
  next();
};

const rateAuthorized = (req, res, next) => {
  const { talk } = req.body;
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  tokenAuthorized,
  nameAuthorized,
  ageAuthorized,
  talkAuthorized,
  dateAuthorized,
  rateAuthorized,
  createdTalker,
};
