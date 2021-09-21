const fs = require('fs').promises;
const database = require('../database');
const { created, unauthorized, badRequest } = require('../httpStatusCode');

const TOKEN_LENGTH = 16;
const NAME_MINIMUM_LENGTH = 3;
const AGE_MINIMUM = 18;
const regexDateFormat = /(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[012])\/(\d{4})/;

const validationToken = (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(unauthorized).json({
      message: 'Token não encontrado',
    });
  }
  
  if (authorization.length < TOKEN_LENGTH) {
    return res.status(unauthorized).json({
      message: 'Token inválido',
    });
  }
  
  next();
};

const validationTalker = (req, res, next) => {
  const { name, age } = req.body;
  
  if (!name) {
    return res.status(badRequest).json({ message: 'O campo "name" é obrigatório' });
  }
  
  if (name.length < NAME_MINIMUM_LENGTH) {
    return res.status(badRequest).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  
  if (!age) {
    return res.status(badRequest).json({ message: 'O campo "age" é obrigatório' });
  }
  
  if (Number(age) < AGE_MINIMUM) {
    return res.status(badRequest).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validationFieldTalk = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(badRequest)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  
  next();
};

const validationDateAndRate = (req, res, next) => {
  const { talk } = req.body;
  
  if (!regexDateFormat.test(talk.watchedAt)) {
    return res.status(badRequest)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  
  if (parseInt(talk.rate, 10) > 5 || parseInt(talk.rate, 10) < 1) {
    return res.status(badRequest)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  
  next();
};

const createTalker = async (req, res, _next) => {
  const talker = req.body;
  
  const readArchive = await fs.readFile(database, 'utf-8')
  .then((data) => JSON.parse(data));
  
  readArchive.push({ id: readArchive.length + 1, ...talker });
  
  await fs.writeFile(database, JSON.stringify(readArchive))
    .then(() => {
    console.log('Arquivo escrito com sucesso!');
  });

  return res.status(created).json({ id: readArchive.length, ...talker });
};

module.exports = {
  validationDateAndRate,
  validationTalker,
  validationFieldTalk,
  validationToken,
  createTalker,
};
