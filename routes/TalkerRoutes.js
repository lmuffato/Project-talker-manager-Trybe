const express = require('express');
const rescue = require('express-rescue');
const fs = require('fs').promises;
const { writeFileSync, readFileSync } = require('fs');

const router = express.Router();
const talkFile = './talker.json';

function getTalkers() {
 return fs.readFile(talkFile, 'utf-8').then((result) => JSON.parse(result));
}

const readFileFn = () => {
  const talkers = readFileSync(talkFile);
  const result = JSON.parse(talkers);
  return result;
};

const getAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });

  if (authorization.length < 16) return res.status(401).json({ message: 'Token inválido' });

  next();
};

const getTalkerName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
   return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const getAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || typeof age !== 'number') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
   return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const getTalkField = (req, res, next) => {
  const { talk } = req.body;

  if (talk === undefined || talk.watchedAt === undefined || talk.rate === undefined) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

const getDate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  if (!watchedAt.match(dateRegex)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const getRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (rate > 5 || rate < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

router.get('/', async (_req, res) => {
  try {
    const talkerPeople = await getTalkers();
    if (talkerPeople.length === 0) return res.status(200).send([]);
    return res.status(200).send(talkerPeople);
  } catch (err) {
    console.log(err);
  }
});

router.get('/search', getAuth, (req, res) => {
  const { q } = req.query;
  const talkers = readFileFn();
  const findTalker = talkers.filter((result) => result.name.includes(q));

  if (!q || q === '') return res.status(200).json(talkers);

  res.status(200).json(findTalker);
});

router.get('/:id', rescue(async (req, res) => {
  const talkerPeople = await getTalkers();

  const talker = talkerPeople.find(({ id }) => id === Number(req.params.id));

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(talker);
}));

router
.post('/', getAuth, getTalkerName, getAge, getTalkField, getDate, getRate, (req, res) => {
  const { name, age, talk } = req.body;
  const talkerPeople = readFileFn();
  const newTalker = {
    id: talkerPeople.length + 1,
    name,
    age,
    talk,
  };

  talkerPeople.push(newTalker);

  writeFileSync(talkFile, JSON.stringify(talkerPeople));

  return res.status(201).json(newTalker);
});

router.put('/:id', getAuth, getTalkerName, getAge, getTalkField, getDate, getRate, (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = readFileFn();
  const talkerPeople = talkers.findIndex((result) => result.id === Number(id));

  talkers[talkerPeople] = { ...talkers[talkerPeople], name, age, talk };

  writeFileSync(talkFile, JSON.stringify(talkers));
  res.status(200).json(talkers[talkerPeople]);
});

router.delete('/:id', getAuth, (req, res) => {
  const { id } = req.params;
  const talkers = readFileFn();
  const talkerPeople = talkers.findIndex((result) => result.id === Number(id));

  talkers.splice(talkerPeople, 1);

  writeFileSync(talkFile, JSON.stringify(talkers));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
