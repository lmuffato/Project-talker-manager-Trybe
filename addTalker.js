const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const talkerArq = './talker.json';

async function takers() {
  const dataTalker = JSON.parse(await fs.readFile(talkerArq, 'utf8'));
  return dataTalker;
}

async function saveTalker(talker) {
 await fs.writeFile(talkerArq, JSON.stringify(talker, null, '\t'));
}

function validateTokenTalker(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  next();
}

const validateNameTalker = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAgeTalker = (req, res, next) => {
  const { age } = req.body;

  if (!age || !Number.isInteger(age)) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateWatchedAtTalker = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  // https://www.regextester.com/99555
  const regexDate = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/i;
  if (!regexDate.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateRateTalker = (req, res, next) => {
  const { talk: { rate } } = req.body;
  
  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const validateTalker = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return (res
      .status(400)
        .json(
          { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
        )
    );
  }

  next();
};

router.post('/',
  validateTokenTalker,
  validateNameTalker,
  validateAgeTalker,
  validateTalker,
  validateWatchedAtTalker,
  validateRateTalker,
  async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const arrayTalkers = await takers();
  const id = arrayTalkers.length + 1;
  arrayTalkers.push({ name, age, talk: { watchedAt, rate } });
  saveTalker(arrayTalkers);
  res.status(201).json({ id, name, age, talk: { watchedAt, rate } });
});

module.exports = router;
