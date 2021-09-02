const isKeyExists = require('../utils/isKeyExists');
const { 
  HTTP_BAD_REQUEST_STATUS,
  HTTP_UNAUTHORIZED_STATUS,
} = require('../utils/statusHTTP');

const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^\w+@\w+\.com$/g;

  if (!email || email === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O campo "email" é obrigatório' });
  }

  if (!regexEmail.test(email)) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;
  const regexPassword = /^.{6,}$/g;

  if (!password || password === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O campo "password" é obrigatório' });
  }

  if (!regexPassword.test(password)) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const isValidToken = (req, res, next) => {
  const { authorization } = req.headers || {};

  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({
      message: 'Token não encontrado',
    }); 
  }

  if (authorization.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ 
      message: 'Token inválido', 
    });
  }

  next();
};

const isValidName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "name" é obrigatório',
    }); 
  }

  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
};

const isValidAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || age === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "age" é obrigatório',
    });
  }

  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }

  next();
};

const isValidWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const regexWatchedAt = /\d{2}\/\d{2}\/\d{4}/g;

  if (!regexWatchedAt.test(watchedAt)) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
  }
  next();
};

const isValidRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (!(rate >= 1 && rate <= 5) || (rate - Math.floor(rate)) !== 0) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const isValidTalkKeys = (req, res, next) => {
  const { talk } = req.body;
  const watchedAt = isKeyExists(talk, 'watchedAt');
  const rate = isKeyExists(talk, 'rate');
    if (!talk || !watchedAt || !rate) {
      return res.status(HTTP_BAD_REQUEST_STATUS).json({ 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
    }); 
  }

  next();
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidToken,
  isValidName,
  isValidAge,
  isValidWatchedAt,
  isValidRate,
  isValidTalkKeys,
};
