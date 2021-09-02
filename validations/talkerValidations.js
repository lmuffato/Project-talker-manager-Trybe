const moment = require('moment');

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const tokenLength = 16;
const nameLength = 3;
const ageAllowed = 18;

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(UNAUTHORIZED).json({
      message: 'Token não encontrado',
    });
  }
  if (authorization.length !== tokenLength) {
    return res.status(UNAUTHORIZED).json({
      message: 'Token inválido',
    });
  }

  return next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || parseInt(name.length, 10) === 0) {
    return res.status(BAD_REQUEST).json(
      { message: 'O campo "name" é obrigatório' },
    );
  }
  if (parseInt(name.length, 10) < nameLength) {
    return res.status(BAD_REQUEST).json(
      { message: 'O "name" deve ter pelo menos 3 caracteres' },
    );
  }
  return next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age.length === 0) {
    return res.status(BAD_REQUEST).json(
      { message: 'O campo "age" é obrigatório' },
    );
  }
  if (parseInt(age, 10) < ageAllowed) {
    return res.status(BAD_REQUEST).json(
      { message: 'A pessoa palestrante deve ser maior de idade' },
    );
  }
  return next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || talk.length === 0) {
    return res.status(BAD_REQUEST).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }
  return next();
};

const validateDate = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const validDate = moment(watchedAt, 'DD/MM/YYYY', true).isValid();

  if (!watchedAt || watchedAt.length === 0) {
    return res.status(BAD_REQUEST).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }
  if (!validDate) {
    return res.status(BAD_REQUEST).json(
      { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
    );
  }
  return next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (parseInt(rate, 10) < 1 || parseInt(rate, 10) > 5) {
    return res.status(BAD_REQUEST).json(
      { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
    );
  }
  if (!rate || parseInt(rate.length, 10) === 0) {
    return res.status(BAD_REQUEST).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }
  return next();
};

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
};

// https://www.delftstack.com/pt/howto/javascript/javascript-validate-date/