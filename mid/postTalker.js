const STATUS_400 = 400;
const STATUS_401 = 401;
const STATUS_201 = 201;
const fs = require('fs').promises;

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(STATUS_400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(STATUS_400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  
  if (!age) {
    return res.status(STATUS_400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(STATUS_400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  
  next();
};

// https://www.regular-expressions.info/dates.html
const regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  
  if (!watchedAt) {
    return res.status(STATUS_400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  
  if (!regex.test(watchedAt)) {
    return res.status(STATUS_400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  
  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!rate) {
    return res.status(STATUS_400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  
  next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(STATUS_401).json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return res.status(STATUS_401).json({ message: 'Token inválido' });
  }

  next();
};

const createTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const data = await fs.readFile('./talker.json', 'utf8').then((e) => JSON.parse(e));
  
  const talker = { name, age, id: data.length + 1, talk };
  await fs.writeFile('./talker.json', JSON.stringify([...data, talker]));
  
  return res.status(STATUS_201).json(talker);
};

module.exports = {
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  validateToken, 
  createTalker,
};
