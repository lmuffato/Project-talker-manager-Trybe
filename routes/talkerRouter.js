const express = require('express');
const { readTalkers, writeTalker, isDateValid } = require('../utils/utils');

const router = express.Router();

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });

  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  next();
};

const verifyTalkerName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const verifyTalkerAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

/**
 * Referência: Uso do Object.keys(talk).includes() para evitar erro do Lint
 * inspirado por consulta ao StackOverflow
 * Link: https://stackoverflow.com/questions/39282873/how-do-i-access-the-object-prototype-method-in-the-following-logic
 */
const verifyTalkerTalk = (req, res, next) => {
  const { talk } = req.body;

  if (
    typeof talk === 'object'
    && Object.keys(talk).includes('rate')
    && Object.keys(talk).includes('watchedAt')
  ) {
    return next();
  }

  return res.status(400).json({
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  });
};

const verifyTalkerDate = (req, res, next) => {
  const { talk } = req.body;

  if (!isDateValid(talk.watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const verifyTalkerRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate < 1 || rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

router.get('/', async (_req, res) => {
  const talkers = await readTalkers();
  res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const talkers = await readTalkers();
  const talker = talkers.find((t) => t.id === +id);

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talker);
});

router.use(verifyToken);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkers();
  const filteredTalkers = talkers.filter((t) => t.id !== +id);

  await await writeTalker(filteredTalkers);

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

router.use(
  verifyTalkerName,
  verifyTalkerAge,
  verifyTalkerTalk,
  verifyTalkerDate,
  verifyTalkerRate,
);

router.post(
  '/',
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await readTalkers();

    const lastId = talkers[talkers.length - 1].id;
    const newId = lastId ? lastId + 1 : 1;
    const newTalker = { id: newId, name, age, talk };
    talkers.push(newTalker);

    await writeTalker(talkers);
    res.status(201).json(newTalker);
  },
);

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await readTalkers();
  const talkerIndex = talkers.findIndex((t) => t.id === +id);

  talkers[talkerIndex] = {
    ...talkers[talkerIndex],
    name,
    age,
    talk,
  };

  await writeTalker(talkers);
  res.status(200).json(talkers[talkerIndex]);
});

module.exports = router;
