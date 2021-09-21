const { badRequest } = require('../httpStatusCode');

const regexDateFormat = /(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[012])\/(\d{4})/;

const validationDateAndRate = (req, res, next) => {
  const { talk } = req.body;

  if (!regexDateFormat.test(talk.watchedAt)) {
    return res.status(badRequest)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (parseInt(talk.rate, 10) > 5 || parseInt(talk.rate, 10) < 1) {
    return res.status(badRequest)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = validationDateAndRate;
