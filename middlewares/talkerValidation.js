const validate = require('validate.js');
const status = require('../status');

const constraints = {
  name: {
    presence: {
      message: '^O campo "name" é obrigatório',
    },
    length: {
      minimum: 3,
      message: '^O "name" deve ter pelo menos 3 caracteres',
    },
  },
  age: {
    presence: {
      message: '^O campo "age" é obrigatório',
    },
    numericality: {
      greaterThanOrEqualTo: 18,
      message: '^A pessoa palestrante deve ser maior de idade',
    },
  },
  talk: {
    presence: {
      message: '^O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    },
  },
  'talk.watchedAt': {
    presence: {
      message: '^O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    },
    format: {
      pattern: '[0-3][0-9]/[0-1][0-9]/[0-9][0-9][0-9][0-9]',
      message: '^O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    },
  },
  'talk.rate': {
    presence: {
      message: '^O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    },
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTo: 1,
      lessThanOrEqualTo: 5,
      message: '^O campo "rate" deve ser um inteiro de 1 à 5',  
    },
  },
};

const talkerValidation = (req, res, next) => {
  const { name, age, talk } = req.body;
  const talker = { name, age, talk };

  const validation = validate(talker, constraints);
  
  if (validation) {
    const [[validationMessage]] = Object.values(validation);
    return res.status(status.badRequest).json({ message: validationMessage });
  }

  next();
};

module.exports = talkerValidation;
