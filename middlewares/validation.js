const checkLength = require('../utils/checkLength');
const { validateDateFormat } = require('../utils/dateValidation');

function validateEmail(req, res, next) {
    const { email } = req.body;
    // regexr.com/2ri2c
    const emailPattern = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
    
    try {
      if (!email) throw new Error('O campo "email" é obrigatório');
      const validEmail = email.match(emailPattern);
      if (!validEmail) throw new Error('O "email" deve ter o formato "email@email.com"');
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

    next();
  }

function validatePassword(req, res, next) {
    const { password } = req.body;
    
    try {
      checkLength({ password }, 6);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

    next();
  }

function validateName(req, res, next) {
    const { name } = req.body;
    try {
      checkLength({ name }, 3);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

    next();
  }

function validateAge(req, res, next) {
    const { age } = req.body;
    try {
      if (!age) throw new Error('O campo "age" é obrigatório');
      if (age < 18) throw new Error('A pessoa palestrante deve ser maior de idade');
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

    next();
  }

const validateTalk = {
  rateAndWatchedAtExists(body) {
    if (!body.talk || body.talk.rate === undefined || !body.talk.watchedAt) {
      throw new Error('O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios');
    }
  },

  dateFormat(watchedAt) {
    if (!validateDateFormat(watchedAt, 'dd/mm/yyyy')) {
      throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
    }
  },

  rate(rate) {
    if (!(typeof rate === 'number' && rate > 0 && rate < 6)) {
      throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
    }
  },

  validate(req, res, next) {
    try {
      validateTalk.rateAndWatchedAtExists(req.body);
      const { talk } = req.body;
      validateTalk.dateFormat(talk.watchedAt);
      validateTalk.rate(talk.rate);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

    next();
  },
};

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
  validateAge,
  validateTalk: validateTalk.validate,
};
