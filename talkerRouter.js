const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const router = require('express').Router();
const arrayTalkerJson = require('./talker.json');

const fileTalkerJson = 'talker.json';

const app = express();
app.use(bodyParser.json());

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
// const PORT = '3000';

router.get('/', async (_req, res) => {
  const talkers = await fs.readFile(fileTalkerJson);
  if (!talkers.length) return res.status(OK).json([]);
  
  res.status(OK).json(JSON.parse(talkers));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(fileTalkerJson);
  const [talker] = JSON.parse(talkers).filter(({ id: talkerID }) => talkerID === Number(id));
  if (!talker) {
    return res.status(NOT_FOUND).json({
      message: 'Pessoa palestrante não encontrada',
    }); 
  }
  
  res.status(OK).json(talker);
});

const gte = (firstValue, secondValue) => firstValue >= secondValue;
const lt = (firstValue, secondValue) => firstValue.length < secondValue;

const isValidToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
        return res.status(UNAUTHORIZED).json({
        message: 'Token não encontrado',
        });
      }
  if (lt(token, 16)) return res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
  req.token = token;
  next();
};

const isValidName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(BAD_REQUEST).json({
    message: 'O campo "name" é obrigatório',
    });
  }
  if (lt(name, 3)) {
    return res.status(BAD_REQUEST).json({
    message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
};

const isValidAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || !Number.isInteger(age)) { // https://www.w3schools.com/jsref/jsref_isinteger.asp
    return res.status(BAD_REQUEST).json({
    message: 'O campo "age" é obrigatório',
    });
  }
  if (!gte(age, 18)) {
    return res.status(BAD_REQUEST).json({
    message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  next();
};

const patternValidator = (pattern) => /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(pattern);

const isValidTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (!patternValidator(talk.watchedAt)) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"', 
    });
  }
  next();
};

const yearValidator = (year) => (year < 1000 || year > 3000);
const monthValidator = (month) => (month <= 0 || month > 12);

const isValidTalkDotWatchedAt = (req, res, next) => { // https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
  const { talk: { watchedAt } } = req.body;
  const parts = watchedAt.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  if (yearValidator(year) || monthValidator(month) || day <= 0 || day > monthLength[month - 1]) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"', 
    });
  } 
  next();
};

  const isValidRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
  if (!Number.isInteger(rate) || !(gte(rate, 1) && !gte(rate, 6))) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5', 
    });
  }
  next();
  };

router.post('/',
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidTalkDotWatchedAt,
  isValidRate,
  async (req, res) => {
  const array = JSON.parse(await fs.readFile(fileTalkerJson));
  const id = arrayTalkerJson[arrayTalkerJson.length - 1].id + 1;
  const newPerson = {
    id,
    ...req.body };
  array.push(newPerson);
  async function addPerson(person) {
    try {
      await fs.writeFile(fileTalkerJson, person);
      const response = JSON.parse(await fs.readFile(fileTalkerJson));
      res.status(CREATED).json(response[response.length - 1]);
    } catch (err) {
      console.error(`Erroo aoo escrever oo arquivoo: ${err.message}`);
    }
  }
  return addPerson(JSON.stringify(array));
});

module.exports = router;
