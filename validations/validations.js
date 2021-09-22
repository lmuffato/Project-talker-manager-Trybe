const moment = require('moment');

const HTTP_BAD_REQ_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED_STATUS)
    .json({ message: 'Token não encontrado' });
  } if (authorization.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(HTTP_BAD_REQ_STATUS).json({ message: 'O campo "name" é obrigatório' });
  } if (name.length < 3) {
    return res.status(HTTP_BAD_REQ_STATUS).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(HTTP_BAD_REQ_STATUS).json({ message: 'O campo "age" é obrigatório' });
  } if (+age < 18) {
    return res.status(HTTP_BAD_REQ_STATUS)
    .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalkWatchedAndRate = (req, res, next) => { // https://stackoverflow.com/questions/40123747/check-if-date-is-a-valid-one; utilizei a lib moment
  const { talk: { watchedAt, rate } } = req.body;
  const parseRate = parseInt(rate, 10);
  if (!moment(watchedAt, 'DD/MM/YYYY', true).isValid()) {
    return res.status(HTTP_BAD_REQ_STATUS)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } if (!Number.isInteger(parseRate) || parseRate < 1 || parseRate > 5) { // // https://www.w3schools.com/jsref/jsref_isinteger.asp; This method returns true if the value is of the type Number, and an integer (a number without decimals). Otherwise it returns false.
    return res.status(HTTP_BAD_REQ_STATUS).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

const validateTalkEmptyValues = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;
  if (!watchedAt || watchedAt === '' || rate === undefined || rate === '') {
    return res.status(HTTP_BAD_REQ_STATUS)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || talk === '') {
    return res.status(HTTP_BAD_REQ_STATUS)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateTalkWatchedAndRate,
  validateTalk,
  validateTalkEmptyValues,
};
