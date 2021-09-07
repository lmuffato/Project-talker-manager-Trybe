const { HTTP_BAD_REQUEST_STATUS, HTTP_UNAUTHORIZED_STATUS } = require('../HTTP_verbs/http_verbs');

const validationEmail = (email) => {
  if (!email) return 'O campo "email" é obrigatório';
  const verificationEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  if (!verificationEmail) return 'O "email" deve ter o formato "email@email.com"';
  return null;
};

const validationPassWord = (password) => {
  if (!password) return 'O campo "password" é obrigatório';
  const passWord = password.toString();
  if (passWord.length < 6) return 'O "password" deve ter pelo menos 6 caracteres';
  return null;
};

const validationToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).send({ message: 'Token não encontrado' }); 
  }
  if (authorization.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).send({ message: 'Token inválido' });
  }

  next();
};

const validationName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(HTTP_BAD_REQUEST_STATUS).send({ message: 'O campo "name" é obrigatório' });
  }  
  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validationAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(HTTP_BAD_REQUEST_STATUS).send({ message: 'O campo "age" é obrigatório' });
  }  
  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validationWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const validationwatchedAt = /\d{2}\/\d{2}\/\d{4}/g.test(watchedAt);
  if (!watchedAt) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
  .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!validationwatchedAt) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validationRates = (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate === undefined) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
  .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const validationTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .send({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

module.exports = {
  validationToken,
  validationName,
  validationEmail,
  validationPassWord,
  validationAge,
  validationWatchedAt,
  validationTalk,
  validationRates,
};