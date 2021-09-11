const fs = require('fs');
const { readTalkers } = require('./getTalkers');
const talkersList = require('../talker.json');

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization !== '7mqaVRXJSp886CGr') {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const nameValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(401).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res
      .status(401)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageValidation = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const watValidation = (req, res, next) => {
  const {
    talk: { watchedAt },
  } = req.body;
  const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

  if (!watchedAt || watchedAt === '') {
    return res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  if (!dateRegex.test(watchedAt)) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const rateValidation = (req, res, next) => {
  const {
    talk: { rate },
  } = req.body;

  if (!rate || rate === '') {
    return res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (rate < 1 || rate > 5) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const addNewTalke = async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkers = readTalkers();
  const newTalker = {
    id: talkers.length + 1,
    name,
    age: parseInt(age, 10),
    talk: {
      watchedAt,
      rate: parseInt(rate, 10),
    },
  };
  const addTalker = talkers.push(newTalker);
  await fs.writeFile(talkersList, JSON.stringify(addTalker));
  return res.status(201).json(newTalker);
};

module.exports = {
  tokenValidation,
  nameValidation,
  ageValidation,
  rateValidation,
  watValidation,
  addNewTalke,
};
