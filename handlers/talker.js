const rescue = require('express-rescue');
const fs = require('fs');

const readTalkers = () => {
  const data = fs.readFileSync('./talker.json', 'utf-8');
  return JSON.parse(data);
};

const getTalkers = rescue(async (_req, res) => {
  const data = readTalkers();
  res.status(200).json(data);
});

const getTalkersId = async (req, res) => {
  const { id } = req.params;
  const data = readTalkers();
  const talker = data.find((t) => t.id === Number(id));
  if (!talker) {
  return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' }); 
}

  return res.status(200).json(talker);
};

const writeTalkers = (talk) => {
  fs.writeFileSync('./talker.json', JSON.stringify(talk));
};

const addNewTalker = async (req, res) => {
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
  talkers.push(newTalker);
  fs.writeFileSync('talker.json', JSON.stringify(talkers));
  return res.status(201).json(newTalker);
};

const changeTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = readTalkers();
  const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id, 10));

  talkers[talkerIndex] = { ...talkers[talkerIndex],
    id: parseInt(id, 10),
    name,
    age,
    talk,
  };
  fs.writeFileSync('talker.json', JSON.stringify(talkers));
  return res.status(200).json(talkers[talkerIndex]);
};

const nameValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res
      .status(400)
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

const talkValidation = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
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
  
  if (rate < 1 || rate > 5) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!rate || rate === '') {
    return res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

module.exports = {
  getTalkers,
  getTalkersId,
  changeTalker,
  readTalkers,
  writeTalkers,
  addNewTalker,
  rateValidation,
  watValidation,
  talkValidation,
  ageValidation,
  nameValidation,
};
