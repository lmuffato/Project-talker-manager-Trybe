const fs = require('fs');
const { HTTP_CREATE_STATUS, HTTP_BAD_REQUEST } = require('../utils/statusHttp');

const newTalker = async (req, res) => {
  const data = '../talker.json';
  const { name, age, talk } = req.body;

  const arrayTalker = JSON.parse(fs.readFileSync('talker.json'));

  const addNewTalker = {
    id: arrayTalker.length + 1, name, age, talk,
  };

  arrayTalker.push(addNewTalker);
  fs.writeFileSync(data, JSON.stringify(arrayTalker));

  res.status(HTTP_CREATE_STATUS).json(addNewTalker);
};

const nameTalker = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
      return res.status(HTTP_BAD_REQUEST).send({
        message: 'O campo "name" é obrigatório',
      });
    }
    if (name.length < 3) {
      return res.status(HTTP_BAD_REQUEST).send({
        message: 'O "name" deve ter pelo menos 3 caracteres',
      });
    }
    
    next();
};

const talkerAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(HTTP_BAD_REQUEST).send({
      message: 'O campo "age" é obrigatório',
    });
  } if (age < 18) {
    return res.status(HTTP_BAD_REQUEST).send({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }

  next();
};

const watchedAndRate = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt || !talk.watchedAt || typeof talk.rate !== 'number') {
    return res.status(HTTP_BAD_REQUEST).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

const watchedTalker = (req, res, next) => {
  const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  const { talk: { watchedAt } } = req.body;

  if (!dateRegex.test(watchedAt)) {
    return res.status(HTTP_BAD_REQUEST).send({
      message: 'O campo "watchedAt" deve ter formato "dd/mm/aaaa"',
    });
  }

  next();
};

const rateTalker = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (rate < 1 || rate > 5) {
    return res.status(HTTP_BAD_REQUEST).send({
      message: 'O campo "rate" deve ser inteiro de 1 à 5',
    });
  }

  next();
};

module.exports = {
  newTalker,
  nameTalker,
  talkerAge,
  watchedAndRate,
  watchedTalker,
  rateTalker,
};