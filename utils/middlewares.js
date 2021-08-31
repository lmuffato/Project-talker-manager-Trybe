const moment = require('moment');

const ERROR_EMAIL_VAZIO = 'O campo "email" é obrigatório';
const ERROR_EMAIL_INVALID = 'O "email" deve ter o formato "email@email.com"';
const ERROR_PASSWORD_VAZIO = 'O campo "password" é obrigatório';
const ERROR_PASSWORD_INVALID = 'O "password" deve ter pelo menos 6 caracteres';
const ERROR_AGE_VAZIO = 'O campo "age" é obrigatório';
const ERROR_AGE_INVALID = 'A pessoa palestrante deve ser maior de idade';
const ERROR_NAME_VAZIO = 'O campo "name" é obrigatório';
const ERROR_NAME_INVALID = 'O "name" deve ter pelo menos 3 caracteres"';
const ERROR_TOKEN_VAZIO = 'Token não encontrado';
const ERROR_TOKEN_INVALID = 'Token inválido';
const ERROR_RATE_INVALID = 'O campo "rate" deve ser um inteiro de 1 à 5';
const ERROR_DATE_INVALID = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';

const validadePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') return res.status(400).json({ message: ERROR_PASSWORD_VAZIO });
  if (password.length < 5) return res.status(400).json({ message: ERROR_PASSWORD_INVALID });

  next();
};

const validadeEmail = (req, res, next) => {
  const { email } = req.body;
  const emailValidator = /^[\S.]+@[a-z]+\.\w{2,3}$/g.test(email);

  if (!email || email === '') return res.status(400).json({ message: ERROR_EMAIL_VAZIO });
  if (!emailValidator) return res.status(400).json({ message: ERROR_EMAIL_INVALID });

  next();
};

const validadeToken = (req, res, next) => {
  const { token } = req.headers;

  if (!token || token === '') return res.status(401).json({ message: ERROR_TOKEN_VAZIO });
  if (token.length !== 16) return res.status(401).json({ message: ERROR_TOKEN_INVALID });

  next();
};

const validadeName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') return res.status(400).json({ message: ERROR_NAME_VAZIO });
  if (name.length < 2) return res.status(400).json({ message: ERROR_NAME_INVALID });

  next();
};

const validadeAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || age === '') return res.status(400).json({ message: ERROR_AGE_VAZIO });
  if (age < 17) return res.status(400).json({ message: ERROR_AGE_INVALID });

  next();
};

const validadeTalk = (req, res, next) => {
  const { talk } = req.body;
  const validDate = moment(talk.watchedAt, 'DD/MM/YYYY').isValid();

  if (!validDate) return res.status(400).json({ message: ERROR_DATE_INVALID });
  if (talk.rate < 1 || talk.rate > 5) return res.status(400).json({ message: ERROR_RATE_INVALID });
  next();
};

module.exports = {
  validadeEmail,
  validadePassword,
  validadeAge,
  validadeName,
  validadeToken,
  validadeTalk,
};