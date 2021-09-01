// Aqui irão ficar contidas as verificações

const rescue = require('express-rescue');
const { status, message } = require('../schema');
const { databaseTalker } = require('../models');

const checkAll = rescue(async (_req, res, next) => {
  const data = await databaseTalker();
  if (!data) return res.status(status.ok).json([]);
  next();
});

const getById = rescue(async (req, res, next) => {
  const idParams = req.params.id;
  const data = await databaseTalker();
  const findTalker = data.find(({ id }) => id === +idParams);
  if (!findTalker) return res.status(status.notFound).json({ message: message.notFound });
  next();
});

const checkLogin = rescue((req, res, next) => {
  const { email, password } = req.body;
  const regexEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  const minPasswordLength = 6;
  if (!email) {
    return res.status(status.badRequest).json({ message: message.emailNotFound });
  }
  if (!regexEmail) {
    return res.status(status.badRequest).json({ message: message.incorrectEmail });
  }
  if (!password) {
    return res.status(status.badRequest).json({ message: message.passwordNotFound });
  }
  if (password.length < minPasswordLength) {
    return res.status(status.badRequest).json({ message: message.shortPassword });
  }
  next();
});

const checkToken = rescue((req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(status.unauthorized).json({ message: message.tokenNotFound });
  }
  if (token.length !== 16) {
    return res.status(status.unauthorized).json({ message: message.invalidToken });
  }
  next();
});

const checkName = rescue((req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(status.badRequest).json({ message: message.invalidName });
  }
  if (name.length < 3) {
    return res.status(status.badRequest).json({ message: message.shortName });
  }
  next();
});

const checkAge = rescue((req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(status.badRequest).json({ message: message.ageNotFound });
  }
  if (age <= 18) {
    return res.status(status.badRequest).json({ message: message.underAge });
  }
  next();
});

const checkRate = rescue((req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!rate) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
    next();
});

const checkDate = rescue((req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const formatData = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/
  .test(watchedAt);

  if (!watchedAt) {
    return res.status(status.badRequest).json({ message: message.invalidTalk });
  }
  if (!formatData) {
    return res.status(status.badRequest).json({ message: message.invalidData });
  }
    next();
});

const checkTalk = rescue((req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(status.badRequest).json({ message: message.invalidTalk });
  }
  next();
});

module.exports = {
  checkAll,
  getById,
  checkLogin,
  checkToken,
  checkName,
  checkAge,
  checkRate,
  checkDate,
  checkTalk,
};
