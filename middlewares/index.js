// Aqui irão ficar contidas as verificações exigidas nos requisitos

const rescue = require('express-rescue');
const { status, message } = require('../schema');
const { data } = require('../models');

const checkAll = rescue(async (_req, res, next) => {
  const databaseTalker = await data();
  if (!databaseTalker) res.status(status.ok).json([]);
  next();
});

const getById = rescue(async (req, res, next) => {
  const idParams = req.params.id;
  const databaseTalker = await data();
  const findTalker = databaseTalker.find(({ id }) => id === +idParams);
  if (!findTalker) res.status(status.notFound).json({ message: message.notFound });
  next();
});

const checkLogin = rescue((req, res, next) => {
  const { email, password } = req.body;
  const regexEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  const minPasswordLength = 6;
  if (!email) {
    res.status(status.badRequest).json({ message: message.emailNotFound });
  }
  if (!regexEmail) {
    res.status(status.badRequest).json({ message: message.incorrectEmail });
  }
  if (!password) {
    res.status(status.badRequest).json({ message: message.passwordNotFound });
  }
  if (password.length < minPasswordLength) {
    res.status(status.badRequest).json({ message: message.shortPassword });
  }
  next();
});

const checkToken = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    res.status(status.unauthorized).json({ message: message.tokenNotFound });
  }
  if (token.length !== 16) {
    res.status(status.unauthorized).json({ message: message.invalidToken });
  }
  next();
};

const checkName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(status.badRequest).json({ message: message.invalidName });
  }
  if (name.length < 3) {
    res.status(status.badRequest).json({ message: message.shortName });
  }
  next();
};

const checkAge = (req, res, next) => {
  const { age } = req.body;
// ora o teste reconhece isso, e ora o teste não reconhece = quando tiver tempo, ver com calma esse erro
  if (!age) {
    res.status(status.badRequest).json({ message: message.ageNotFound });
  }
  if (age <= 18) {
    res.status(status.badRequest).json({ message: message.underAge });
  }
  next();
};

const checkRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (rate < 1 || rate > 5) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!rate) {
    res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
    next();
};

const checkDate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const formatData = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/
  .test(watchedAt);

  if (!watchedAt) {
    res.status(status.badRequest).json({ message: message.invalidTalk });
  }
  if (!formatData) {
    res.status(status.badRequest).json({ message: message.invalidData });
  }
    next();
};

const checkTalk = (req, res, next) => {
  const { talk } = req.body;
   if (!talk) {
    res.status(status.badRequest).json({ message: message.invalidTalk });
  }
  next();
};

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
