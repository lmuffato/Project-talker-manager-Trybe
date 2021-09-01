const moment = require('moment');

const BAD_REQUEST = 400;

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

module.exports = { validateTalk, validateTalkEmptyValues, validateTalkKeys };