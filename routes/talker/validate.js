const { HTTP_UNAUTHORIZED_CLIENT_STATUS,
  HTTP_BAD_REQUEST_STATUS } = require('../../util/constants');
const isNameValid = require('./validation/name');
const isTokenValid = require('./validation/token');
const isAgeValid = require('./validation/age');
const isRateValid = require('./validation/rate');
const isDateValid = require('./validation/date');

const validateToken = (req, res, next) => {
  const { authorization } = req.headers || {};
  if (!authorization) {
    return res
      .status(HTTP_UNAUTHORIZED_CLIENT_STATUS)
      .json({ message: 'Token não encontrado' });
  }
  if (!isTokenValid(authorization)) {
    return res
      .status(HTTP_UNAUTHORIZED_CLIENT_STATUS)
      .json({ message: 'Token inválido' }); 
    }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body || {};
  if (!name) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "name" é obrigatório' });
  }
  if (!isNameValid(name)) {
    return res
    .status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body || {};
  if (!age) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "age" é obrigatório' });
  }
  if (!isAgeValid(age)) {
    return res
    .status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body || {};
  if (!talk || typeof talk.rate === 'undefined' || !talk.watchedAt) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  next();
 };

const validateWatchedAt = (req, res, next) => {
  const { talk } = req.body || {};
  if (!isDateValid(talk.watchedAt)) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body || {};
  if (!isRateValid(Number(talk.rate))) {
    return res
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
};