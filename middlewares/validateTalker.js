const moment = require('moment');

module.exports = {
  validateName: (req, res, next) => {
    const { name } = req.body;
    if (!name || name === '') {
      res.status(400).json({
        message: 'O campo "name" é obrigatório',
      });
    }

    if (name.length < 3) {
      res.status(400).json({
        message: 'O "name" deve ter pelo menos 3 caracteres',
      });
    }
    next();
  },
  validateAge: (req, res, next) => {
    const { age } = req.body;
    if (!age || age === '') {
      res.status(400).json({
        message: 'O campo "age" é obrigatório',
      });
    }

    if (age < 18) {
      res.status(400).json({
        message: 'A pessoa palestrante deve ser maior de idade',
      });
    }
    next();
  },
  validateWatchedAt: (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    const validDate = moment(watchedAt, 'DD/MM/YYYY', true).isValid();
    
    if (!validDate) {
      res.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      });
    }
    next();
  },
  validateRate: (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (!(rate >= 1 && rate <= 5)) {
      res.status(400).json({
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      });
    }
    next();
  },
  validateTalk: (req, res, next) => {
    const { talk } = req.body;
    if (!talk || !talk.watchedAt || !talk.rate) {
      res.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
    }
    next();
  },
};
