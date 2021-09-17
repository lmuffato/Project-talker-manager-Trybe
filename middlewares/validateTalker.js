const http = require('../helper/httpStatus');

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.length === 0) {
    return res.status(http.BAD_REQUEST)
      .json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(http.BAD_REQUEST)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || age.length === 0) {
    return res.status(http.BAD_REQUEST)
      .json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(http.BAD_REQUEST)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(http.BAD_REQUEST)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }

  if (!talk.watchedAt || talk.rate === undefined || talk.rate === '') {
    return res.status(http.BAD_REQUEST)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }

  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const checkSlash = talk.watchedAt.includes('/');
  const dateParts = talk.watchedAt.split('/');
  const actualYear = new Date().getFullYear();

  if (!checkSlash || dateParts[0] > 31 || dateParts[1] > 12 || dateParts[2] > actualYear) {
    return res.status(http.BAD_REQUEST)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;

  if (typeof talk.rate !== 'number' || talk.rate <= 0 || talk.rate > 5) {
    return res.status(http.BAD_REQUEST)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = {
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
};
