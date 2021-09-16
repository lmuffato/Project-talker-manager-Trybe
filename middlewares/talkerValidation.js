const HTTP_UNAUTHORIZED = 401;
const HTTP_BAD_REQUEST = 400;
const dateValidator = require('moment');

const tokenVerifier = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED).json({
      message: 'Token não encontrado',
    });
  }

  if (authorization.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED).json({
      message: 'Token inválido',
    });
  }
  next();
};

const nameVerifier = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "name" é obrigatório',
    });
  }

  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
};

const ageVerifier = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "age" é obrigatório',
    });
  }

  if (age.length < 3) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  next();
};

const rateVerifier = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || talk.rate === undefined) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

const watchVerifier = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || talk.watchedAt === undefined) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (!dateValidator(talk.watchedAt, 'DD/MM/YYYY', true).isValid()) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

module.exports = {
  tokenVerifier,
  nameVerifier,
  ageVerifier,
  rateVerifier,
  watchVerifier,
};