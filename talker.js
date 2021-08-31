const express = require('express');
const { readFileSync, writeFileSync } = require('fs');

const router = express.Router();

const readTalkerFile = () => {
  const talkersList = readFileSync('./talker.json');
  const data = JSON.parse(talkersList);

  return data;
};

const authToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });

  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  next();
};

const authName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const authAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || typeof age !== 'number') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const authTalk = (req, res, next) => {
  const { talk } = req.body;

  if (talk === undefined || talk.watchedAt === undefined || talk.rate === undefined) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório e "watchedAt"'
      + ' e "rate" não podem ser vazios' });
  }

  next();
};

const authWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  const validadeDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  if (!watchedAt.match(validadeDate)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const authRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (rate > 5 || rate < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

router.get('/', (_req, res) => {
  try {
    const talkers = readTalkerFile();
    return res.status(200).json(talkers);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const talkers = readTalkerFile();
    
    const talkerById = talkers.find((talker) => talker.id === Number(id));
    
    if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  
    return res.status(200).json(talkerById);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.post('/', authToken, authName, authAge, authTalk, authWatchedAt, authRate, (req, res) => {
  const { name, age, talk } = req.body;

  const talkers = readTalkerFile();

  const talkerRegistered = {
    id: talkers.length + 1,
    name,
    age,
    talk,
  };

  talkers.push(talkerRegistered);

  writeFileSync('./talker.json', JSON.stringify(talkers));

  return res.status(201).json(talkerRegistered);
});

router.put('/:id', authToken, authName, authAge, authTalk, authWatchedAt, authRate, (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const talkers = readTalkerFile();

  const updatedTalkers = talkers.map((talker) => {
    if (talker.id === Number(id)) return ({ id: Number(id), name, age, talk });
    return talker;
  });

  writeFileSync('./talker.json', JSON.stringify(updatedTalkers));

  const editedTalker = updatedTalkers.find((talker) => talker.id === Number(id));

  return res.status(200).json(editedTalker);
});

module.exports = router;
