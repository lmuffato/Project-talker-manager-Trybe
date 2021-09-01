const { checkTalk, validateRate } = require('../services/checkTalk');

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const regx = /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

  if (checkTalk(talk)) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  if (validateRate(talk.rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!regx.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = validateTalk;