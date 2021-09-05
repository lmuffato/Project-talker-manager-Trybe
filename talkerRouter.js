const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');

router.use(bodyParser.json());

const fsAsync = require('fs').promises;

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const TALKER_FILE = './talker.json';

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
};

// REQUISITO 1

router.get('/', async (_req, res) => {
  const talkers = await fsAsync.readFile(TALKER_FILE, 'utf-8');
  const formatedTalkers = await JSON.parse(talkers);
  if (!formatedTalkers) return res.status(HTTP_OK_STATUS).json([]);
  res.status(HTTP_OK_STATUS).json(formatedTalkers);
});

// fonte para o entendimento do JSON.parse: 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse

router.get('/search', validateToken, async (req, res) => {
  const { name } = req.query;
  
  const allTalker = await fsAsync.readFile(TALKER_FILE, 'utf-8');
  const allTalkerJson = await JSON.parse(allTalker);
  if (!name || name === '') return res.status(HTTP_OK_STATUS).json(allTalkerJson);
  const filteredTalkers = allTalkerJson.filter((talker) => talker.name.includes(name));
  if (filteredTalkers === null) return res.status(200).json([]);
  res.status(HTTP_OK_STATUS).json(filteredTalkers);
});

// REQUISITO 2

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fsAsync.readFile(TALKER_FILE, 'utf-8');
  const formatedTalkers = await JSON.parse(talkers);
  const chosedTalker = await formatedTalkers.find((talker) => talker.id === parseInt(id, 10));

  if (!chosedTalker) {
    return res.status(HTTP_NOT_FOUND_STATUS)
    .json({ message: 'Pessoa palestrante não encontrada' }); 
  }

  res.status(HTTP_OK_STATUS).json(chosedTalker);
});

// utilizei esse artigo para corrigir o erro de lint no parseInt da linha 35:
// https://eslint.org/docs/rules/radix

// REQUISITO 4

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
 return res.status(400)
  .json({ message: 'O campo "name" é obrigatório' }); 
}
  if (name.length < 3) {
 return res.status(400)
  .json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
}
 next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (parseInt(age, 10) < 18) {
 return res.status(400)
  .json({ message: 'A pessoa palestrante deve ser maior de idade' }); 
}
 next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  if (parseInt(talk.rate, 10) < 1 || parseInt(talk.rate, 10) > 5) {
    return res.status(400)
     .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
   }
   next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || talk.rate === undefined) {
 return res.status(400)
  .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
}
 next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const regexData = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

 if (!regexData.test(talk.watchedAt)) {
    return res.status(400)
     .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
   } 
   next();
};

router.post('/', validateToken,
 validateName, validateAge, validateTalk, validateWatchedAt, validateRate, async (req, res) => {
  const { name, age, talk } = req.body;
  const allTalker = await fsAsync.readFile(TALKER_FILE, 'utf-8');
 const allTalkerJson = await JSON.parse(allTalker);
 const responseObj = {
    id: allTalkerJson.length + 1,
    name,
    age,
    talk,
  };

  await allTalkerJson.push(responseObj);
  
  await fsAsync.writeFile(TALKER_FILE, JSON.stringify(allTalkerJson));
  
  return res.status(201).json(responseObj);
});

router.put('/:id', validateToken,
validateName, validateAge, validateTalk, validateWatchedAt, validateRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const allTalker = await fsAsync.readFile(TALKER_FILE, 'utf-8');
  const allTalkerJson = await JSON.parse(allTalker);
  const talkerIndex = allTalkerJson.findIndex((talker) => talker.id === parseInt(id, 10));

  allTalkerJson[talkerIndex] = {
    id: parseInt(id, 10),
    name,
    age: Number(age),
    talk: {
      watchedAt: talk.watchedAt,
      rate: Number(talk.rate),
    },
  };
  
  await fsAsync.writeFile(TALKER_FILE, JSON.stringify(allTalkerJson));
  res.status(HTTP_OK_STATUS).json(allTalkerJson[talkerIndex]);
});

router.delete('/:id', validateToken, async (req, res) => {
const { id } = req.params;
const allTalker = await fsAsync.readFile(TALKER_FILE, 'utf-8');
const allTalkerJson = await JSON.parse(allTalker);
const talkerIndex = allTalkerJson.findIndex((talker) => talker.id === parseInt(id, 10));

allTalkerJson.splice(talkerIndex, 1);

await fsAsync.writeFile(TALKER_FILE, JSON.stringify(allTalkerJson));
res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

// fonte para o entendimento do método splice: 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice 

module.exports = router;