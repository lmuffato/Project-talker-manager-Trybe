const moment = require('moment');

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;

const validateEmailMiddleware = (req, res, next) => {
  const { email } = req.body;
  // https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression onde peguei regex
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript onde aprendi a usar o .test
  if (email === '' || email === undefined) { 
    return res.status(BAD_REQUEST)
    .json({ message: 'O campo "email" é obrigatório' });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(BAD_REQUEST)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validatePasswordMiddleware = (req, res, next) => {
  const { password } = req.body;
  if (password === '' || password === undefined) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === undefined) {
    return res.status(UNAUTHORIZED)
    .json({ message: 'Token não encontrado' });
  } if (authorization.length !== 16) {
    return res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (name === undefined || name === '') {
    return res.status(BAD_REQUEST).json({ message: 'O campo "name" é obrigatório' });
  } if (name.length < 3) {
    return res.status(BAD_REQUEST).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (age === '' || age === undefined) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
  } if (+age < 18) {
    return res.status(BAD_REQUEST)
    .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalkKeys = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;
  const rateParse = +rate;
  // https://www.delftstack.com/howto/javascript/javascript-validate-date/#validate-date-with-with-date.parse-method-in-javascript
  if (!moment(watchedAt, 'DD/MM/YYYY', true).isValid()) {
    return res.status(BAD_REQUEST)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } if (!Number.isInteger(rateParse) || rateParse < 1 || rateParse > 5) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
// https://www.w3schools.com/jsref/jsref_isinteger.asp
  next();
};

const validateTalkEmptyValues = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;
  if (watchedAt === '' || watchedAt === undefined || rate === '' || rate === undefined) {
    return res.status(BAD_REQUEST)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (talk === undefined || talk === '') {
    return res.status(BAD_REQUEST)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

module.exports = { 
  validateEmailMiddleware,
  validatePasswordMiddleware,
  validateToken,
  validateName,
  validateAge,
  validateTalkKeys,
  validateTalk,
  validateTalkEmptyValues,
};