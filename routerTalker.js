const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const fs = require('fs').promises;
const { validateToken } = require('./token');
const { 
  nameValidation, 
  ageValidation, 
  rateValidation,
  dateValidation,
  talkValidationMandatory,
} = require('./MiddlewaresValidation');

const talkerJSON = './talker.json';

router.use(bodyParser.json());

router.get('/', async (_req, res) => {
  try {
    const talker = await fs.readFile(talkerJSON, 'utf8');
    res.status(200).json(JSON.parse(talker));
  } catch (err) {
    res.status(500).send(err.message);
  } 
});

router.post('/', 
validateToken, 
nameValidation, 
ageValidation, 
talkValidationMandatory, 
dateValidation,
rateValidation,
async (req, res) => {
  const talker = await fs.readFile(talkerJSON, 'utf8');
  const talkerParse = JSON.parse(talker);
  const { name, age, talk } = req.body;

  const newPeople = {
    name,
    age,
    id: talkerParse.length + 1,
    talk,
  };
  
  talkerParse.push(newPeople);
  await fs.writeFile(talkerJSON, JSON.stringify(talkerParse));

  res.status(201).json(newPeople);
}); 

router.get('/:id', async (req, res) => {
  const talker = await fs.readFile(talkerJSON, 'utf8');
  const { id } = req.params;
  const people = JSON.parse(talker).find((p) => p.id === +id);
  
  if (!people) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(people);
});

router.put('/:id',
validateToken,
nameValidation, 
ageValidation, 
talkValidationMandatory,
dateValidation, 
rateValidation,
 async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  
  const talker = await fs.readFile(talkerJSON, 'utf8');
  const talkerParse = JSON.parse(talker);

  const editTalker = { name, age, talk, id: +id };
  const talkerId = talkerParse.filter((p) => p.id === +id);
  talkerId.push(editTalker);

  await fs.writeFile('talker.json', JSON.stringify(talkerId));
  return res.status(200).json(editTalker);
});

router.delete('/:id', validateToken, async (req, res) => {
const talker = await fs.readFile(talkerJSON, 'utf8');
const talkerParse = JSON.parse(talker);
const { id } = req.params;

const talkerId = talkerParse.findIndex((p) => p.id === +id);

talkerParse.splice(talkerId, 1);

await fs.writeFile('talker.json', JSON.stringify(talkerParse));

res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});
    
module.exports = router;