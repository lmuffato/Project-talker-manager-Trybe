const express = require('express');
const { readFile } = require('fs').promises;

const router = express.Router();

const readTalkersList = async (fileName) => {
  try {
    const data = await readFile(fileName, 'utf-8');
    const talkersList = await JSON.parse(data);
    return talkersList;
  } catch (e) {
    return e;
  }
};

router.get('/', async (_req, res) => {
  try {
    const talkersList = await readTalkersList('./talker.json');
    res.status(200).json(talkersList);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  let talkersList = [];
  try {
    talkersList = await readTalkersList('./talker.json');
  } catch (e) {
    res.status(400).json({ message: e.message });
  }

  const talker = talkersList.find((person) => person.id === parseInt(id, 10));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

function validateToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || authorization === ' ') {
    return res.status(401).json({ message: 'token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'token inválido' });
  }
  next();
}

function validateName(req, res, next) {
  const { name } = req.body;
  if (!name || name === ' ') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;
  if (!age || age === ' ') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

const AuthMiddleware = [validateToken, validateName, validateAge];

router.post('/talker', AuthMiddleware, (_req, _res) => {

});
module.exports = router;
