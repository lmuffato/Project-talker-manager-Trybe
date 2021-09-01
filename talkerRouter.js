const { Router } = require('express');
const fs = require('fs').promises;

const router = Router();

const HTTP_OK_STATUS = 200;
const talkers = './talker.json';

const readFile = () => fs.readFile(talkers, 'utf8')
  .then((data) => JSON.parse(data));

router.get('/', async (_req, res) => {
  const talkersList = await readFile();
  return res.status(HTTP_OK_STATUS).json(talkersList);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkersList = await readFile();
  const foundTalker = talkersList.find((talker) => talker.id === parseInt(id, 0));

  if (!foundTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).send(foundTalker);
});

function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
}

function nameValidation(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function ageValidation(req, res, next) {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (parseInt(age, 0) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

function talkValidation(req, res, next) {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
}

function rateValidation(req, res, next) {
  const { talk: { rate } } = req.body; 
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

function watchedValidation(req, res, next) {
  const { talk: { watchedAt } } = req.body;
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (regex.test(watchedAt) === false) {
    return res.status(400).json({ 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
}

router.post('/', tokenValidation, nameValidation, 
  ageValidation, talkValidation, rateValidation, watchedValidation, async (req, res) => {
  const { name, age, talk } = req.body;
  const talkersList = await readFile();
  const createNewTalker = {
    name,
    age,
    talk,
    id: talkersList.length + 1,
  };
  talkersList.push(createNewTalker);
  await fs.writeFile(talkers, JSON.stringify(talkersList));
  res.status(201).json(createNewTalker);
});

router.put('/:id', tokenValidation, nameValidation, ageValidation, talkValidation,
  rateValidation, watchedValidation, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkersList = await readFile();
  const talkerById = talkersList.find((talker) => talker.id === id);

  const edit = {
    name,
    age, 
    talk,
    id: Number(id),
  };

  talkerById.push(edit);
  await fs.writeFile(talkers, JSON.stringify(talkerById));
  
  return res.status(200).json(edit);
});

module.exports = router;