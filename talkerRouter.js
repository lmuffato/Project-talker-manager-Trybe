const express = require('express');
const fs = require('fs').promises;
const moment = require('moment');

const talkerRouter = express.Router();

const getData = async () => fs.readFile('./talker.json', 'utf-8')
  .then((data) => JSON.parse(data));

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) res.status(401).json({ message: 'Token inválido' });

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (!Number.isInteger(age) || age < 18) {
    return res.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }

  next();
};

const ValidateDate = (req, res, next) => {
  const { talk } = req.body;

  if (!moment(talk.watchedAt, 'DD/MM/YYYY', true).isValid()) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;

  if (!Number.isInteger(talk.rate)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

talkerRouter.get('/', async (_req, res) => {
  const result = await getData();
  res.status(200).json(result);
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const allTalkers = await getData();
  const result = allTalkers.find((talker) => talker.id === +id);

  if (!result) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(result);
});

talkerRouter.post('/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  ValidateDate,
  validateRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const data = await fs.readFile('./talker.json', 'utf-8');
    const talkers = await JSON.parse(data);
    const newTalker = {
      id: talkers.length + 1,
      name,
      age,
      talk,
    };
    talkers.push(newTalker);
    await fs.writeFile('./talker.json', JSON.stringify(talkers));
  
    return res.status(201).json(newTalker);
  });

module.exports = talkerRouter;
